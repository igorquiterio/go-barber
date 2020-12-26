import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
