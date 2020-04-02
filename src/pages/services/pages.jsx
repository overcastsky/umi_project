import { urls, services } from '../../api';

export function fetch() {
  return services.request({ url: urls.copyIntent }, {});
}
