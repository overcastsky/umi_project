import { urls, services } from '../../api';

export function fetch() {
  return services.request(urls.copyIntent, { method: 'POST' });
}
