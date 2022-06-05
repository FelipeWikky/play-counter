import { AbstractStorage } from ".";
import { Configuration } from "../../models/Configuration";


const STORAGE_CONFIGURATION_KEY = "PlayCounter_configuration";

class ConfigurationStorageClass extends AbstractStorage<Configuration> {
    constructor() {
        super(STORAGE_CONFIGURATION_KEY)
    }
}

const ConfigurationStorage = new ConfigurationStorageClass();

export {
    ConfigurationStorage
} 