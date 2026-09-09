import * as React from 'react';
import axios from 'axios';
import { api } from '../api/api';

export interface AcademyParams {
  startDate?: string;
  endDate?: string;
  sport?: string;
}

export interface AcademyClass {
  id: string;
  [key: string]: unknown;
  day?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  court?: string;
  trainers?: string;
  price?: number;
  priceLabel?: string;
  sport?: string;
}

export const useGetAcademy = () => {
  const [academyData, setAcademyData] = React.useState<AcademyClass[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAcademy = React.useCallback(async (params: AcademyParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<{ ok: boolean; academy: AcademyClass[] }>(
        '/academy/getaways',
        {
        params: {
          ...(params.startDate && { startDate: params.startDate }),
          ...(params.endDate && { endDate: params.endDate }),
          ...(params.sport && { sport: params.sport }),
        },
        }
      );

      setAcademyData(response.data.academy ?? []);
      // console.log('Academy response:', response.data)
    } catch (err: unknown) {
      console.error('Error fetching academy classes:', err);
      if (axios.isAxiosError<{ message?: string }>(err)) {
        console.error('Academy API error:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error fetching academy classes');
      }
      setAcademyData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { academyData, loading, error, fetchAcademy };
};
