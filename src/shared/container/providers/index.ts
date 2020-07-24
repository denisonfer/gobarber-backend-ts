import { container } from "tsyringe";

import IStorageProvider from './storageProviders/models/IStorageProvider';
import DiskStorageProvider from './storageProviders/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';


container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

//container.registerSingleton<IMailProvider>('StorageProvider', DiskStorageProvider);

