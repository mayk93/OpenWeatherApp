/**
 * Created by michael on 25/09/2017.
 */

export const BACKEND_SERVER = (
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
)