import { urls, services } from '../../api';

export function fetch() {
  console.log('urls', urls);
  return services.request('/app/orgIntent/copyIntent', { method: 'POST' });
}
