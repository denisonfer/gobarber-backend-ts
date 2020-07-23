import { container } from "tsyringe";
import IStorageProvider from './storageProviders/models/IStorageProvider';
import DiskStorageProvider from './storageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);

