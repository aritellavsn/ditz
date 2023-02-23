import fetchMock from "fetch-mock";
import { Card } from "metabase-types/api";
import { createMockCard } from "metabase-types/api/mocks";
import {
  getQuestionVirtualTableId,
  convertSavedQuestionToVirtualTable,
} from "metabase-lib/metadata/utils/saved-questions";
import { PERMISSION_ERROR } from "./constants";
import { getRequestBody } from "./utils";

export function setupCardEndpoints(card: Card) {
  fetchMock.get(`path:/api/card/${card.id}`, card);
  fetchMock.put(`path:/api/card/${card.id}`, async (url, request) => {
    return createMockCard(await getRequestBody(request));
  });

  const virtualTableId = getQuestionVirtualTableId(card.id);
  fetchMock.get(`path:/api/table/${virtualTableId}/query_metadata`, {
    ...convertSavedQuestionToVirtualTable(card),
    fields: card.result_metadata.map(field => ({
      ...field,
      table_id: virtualTableId,
    })),
    dimension_options: {},
  });
}

export function setupCardsEndpoints(cards: Card[]) {
  fetchMock.get({ url: "path:/api/card", overwriteRoutes: false }, cards);
  cards.forEach(card => setupCardEndpoints(card));
}

export function setupUnauthorizedCardEndpoints(card: Card) {
  fetchMock.get(`path:/api/card/${card.id}`, {
    status: 403,
    body: PERMISSION_ERROR,
  });

  const virtualTableId = getQuestionVirtualTableId(card.id);
  fetchMock.get(`path:/api/table/${virtualTableId}/query_metadata`, {
    status: 403,
    body: PERMISSION_ERROR,
  });
}

export function setupUnauthorizedCardsEndpoints(cards: Card[]) {
  cards.forEach(card => setupUnauthorizedCardEndpoints(card));
}
