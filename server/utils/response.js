export const res_help = (res,success_bool, success_message, payload = null) => {
    return res.json({
        success: success_bool,
        message: success_message,
        payload: payload
    })
}