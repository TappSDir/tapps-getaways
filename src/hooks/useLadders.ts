import { useState, useCallback } from 'react';
import { Ladder, LadderClientService } from '../services/ladder';
import { useTranslation } from 'react-i18next';
import { isAxiosError } from 'axios';

export const useLadders = () => {
  const { t } = useTranslation();
  const [ladders, setLadders] = useState<Ladder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLadders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // const data = await TournamentClientService.getTournaments(token);
      const data = await LadderClientService.getLadders();
      setLadders(data);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError(t('common.noAccess'));
      } else if (isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || t('ladders.error'));
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('ladders.error'));
      }
    } finally {
      setLoading(false);
    }
  }, [t]);

  return { ladders, loading, error, fetchLadders };
}