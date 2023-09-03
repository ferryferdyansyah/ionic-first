import { createAction } from "@ngrx/store"
import { hide, show } from "./loading.action"
import { loadingReducer } from "./loading.reducers"
import { LoadingState } from "./LoadingState"

describe('Loading store', () => {

    it('show', () => {
        const initialState: LoadingState = {show: false}
        const newState = loadingReducer(initialState, show())

        expect(newState).toEqual({show: true})
    })

    it('should keep state if action is unknown', () => {
        const initialState: LoadingState = {show: true}
        const action = createAction("UNKNOWN")
        const newState = loadingReducer(initialState, action)

        expect(newState).toEqual({show: true})
    })
})