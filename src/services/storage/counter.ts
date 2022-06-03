import { StorageService } from ".";
import { Counter } from "../../models/Counter";

interface ICounterStorage {
    [x: string]: Counter
}

const STORAGE_COUNTER_KEY = "PlayCounter_counter";

class CounterStorageClass extends StorageService<ICounterStorage> {
    constructor() {
        super(STORAGE_COUNTER_KEY)
    }

    async get<Counter>(date: string) {
        const getted = await super.get<Counter>();
        if (getted) {
            const counter = (getted[date] as Counter);
            return counter;
        }
        return null;
    }

    async set<Counter>(value: Counter, date: string): Promise<boolean> {
        const parsed = await super.get<ICounterStorage>();
        await super.set<ICounterStorage>({
            ...parsed,
            [date]: value
        } as ICounterStorage);
        return true;
    }
}

const CounterStorage = new CounterStorageClass();

export {
    CounterStorage
} 