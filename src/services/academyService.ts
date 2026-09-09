import { api } from '../api/api';

// Interfaces para tipado estricto
export interface GetAcademyParams {
  fechaInicio?: string;
  fechaFin?: string;
  sport?: string;
}

export interface AcademyClass {
  id: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  court?: string;
  trainers?: string;
  price?: number;
  sport?: string;
  enddate?: any;
  startdate?: any;
  [key: string]: any; // Para propiedades dinámicas adicionales
}
// Configura la URL base de tu backend (puedes sacarla de process.env.REACT_APP_API_URL o import.meta.env)
/**
 * Servicio frontend para consultar las clases de la academia.
 * Consume el GET endpoint enviando fechaInicio, fechaFin y deporte opcionalmente.
 */
export const getAcademyService = async (params?: GetAcademyParams): Promise<AcademyClass[]> => {
  try {
    const response = await api.get<{ ok: boolean; academy: AcademyClass[] }>('/academy/getaways', {
      params: {
        ...(params?.fechaInicio && { fechaInicio: params.fechaInicio }),
        ...(params?.fechaFin && { fechaFin: params.fechaFin }),
        ...(params?.sport && { deporte: params.sport }),
      },
    });

    return response.data.academy ?? [];
  } catch (error: unknown) {
    console.error('Error al obtener clases de la academia:', error);
    throw error;
  }
};
