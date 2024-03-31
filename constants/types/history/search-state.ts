
interface SearchState {
    query: string;
    result: any[];
    loading: boolean;
}

const initialSearchState: SearchState = {
    query: "",
    result: [],
    loading: false,
};

export default initialSearchState;

// searchReducer.ts