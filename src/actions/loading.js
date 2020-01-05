export const UPDATE_LOADING = 'app/update/loading'

export function updateLoading(loading){
    return {
        type: UPDATE_LOADING,
        loading
    }
}