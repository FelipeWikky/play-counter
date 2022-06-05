import AsyncStorage from "@react-native-async-storage/async-storage";

abstract class AbstractStorage<T> {
    constructor(private readonly KEY_STORAGE: string) {

    }

    async get<C>(...otherValues: any): Promise<T | C | null> {
        try {
            const getted = await AsyncStorage.getItem(this.KEY_STORAGE);
            if (getted) {
                return (JSON.parse(getted) as T);
            }
            return null;
        } catch (error) {
            console.error("Erro em Storage.get:", error);
            return null;
        }
    }

    async set<C>(value: T | C, ...otherValues: any): Promise<boolean | null> {
        try {
            if (!value) throw new Error("Value received on Storage.set is null");

            const setted = JSON.stringify(value);
            await AsyncStorage.setItem(this.KEY_STORAGE, setted);
            return true;

        } catch (error) {
            console.error("Error on Storage.get:", error);
            return null;
        }
    }

    async remove(): Promise<boolean | null> {
        try {
            await AsyncStorage.removeItem(this.KEY_STORAGE);
            return true;
        } catch (error) {
            console.error("Error on Storage.remove: ", error);
            return null;
        }
    }
};

class Storage<T> extends AbstractStorage<T> {
    constructor(STORAGE_KEY: string) {
        super(STORAGE_KEY)
    }
}

export {
    AbstractStorage,
    Storage
}