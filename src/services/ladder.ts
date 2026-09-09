import { api } from '../api/api';
export interface Ladder {
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface LaddersApiResponse {
  ok: boolean;
  ladders: Ladder[];
}

export class LadderClientService {
  static async getLadders(): Promise<Ladder[]> {
    const { data } = await api.get<LaddersApiResponse>('/ladder/getaways');

    return data.ladders;
  }
}
