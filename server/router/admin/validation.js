const Joi = require('joi')

const AdminRegValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        roles: Joi.string().required(),
        admin_id: Joi.optional()
    })
    return schema.validate(data)
}

const LoginValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}


const ExpertTipsValidation = (data) => {

    const schema = Joi.object().keys({
        home_team: Joi.string().required(),
        away_team: Joi.string().required(),
        tip: Joi.string().required(),
        match_time: Joi.string().required(),
        match_day: Joi.string().required(),
        league_sport: Joi.string().required(),
        admin_id: Joi.string().required(),
        home_img: Joi.allow().optional(),
        away_img: Joi.allow().optional(),
        ref: Joi.allow().optional(),
    })
    return schema.validate(data)
}

const blogValidation = (data) => {

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.allow().optional(),
        admin_id: Joi.allow().optional(),
    })
    return schema.validate(data)
}


const PredictionTipsValidation = (data) => {

    const schema = Joi.object().keys({
        home_team: Joi.string().required(),
        away_team: Joi.string().required(),
        prediction_type: Joi.string().required(),
        match_date: Joi.string().required(),
        match_time: Joi.string().required(),
        league: Joi.string().required(),
        match_status: Joi.allow().optional(),
        selection: Joi.allow().optional(),
        result: Joi.allow().optional(),
    })
    return schema.validate(data)
}

const PredictionTipsResultValidation = (data) => {

    const schema = Joi.object().keys({
        
match_status: Joi.string().required(),
result: Joi.string().required(),
    })
    return schema.validate(data)
}

const PredictionUpdateValidation = (data) => {

    const schema = Joi.object().keys({
        id: Joi.number().required(),
        match_status: Joi.string().required(),
        result: Joi.string().required(),
    })
    return schema.validate(data)
}


const ResetPassValidation = (data) => {

    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
    })

    return schema.validate(data)
}

const resetPass = (data) => {

    const schema = Joi.object().keys({
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const RegValidation = (data) => {

    const schema = Joi.object().keys({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        referral: Joi.optional(),
        password: Joi.string().min(6).required()
    })

    // VALIDATE ADMIN USERS INPUT DATA
    return schema.validate(data)
}

const passwordUpdateValidation = (data) => {

    const schema = Joi.object().keys({
        id: Joi.required(),
        password: Joi.string().min(6).required()
    })

    // VALIDATE ADMIN USERS INPUT DATA
    return schema.validate(data)
}
 


 
module.exports = {PredictionTipsResultValidation ,passwordUpdateValidation,PredictionUpdateValidation, PredictionTipsValidation ,blogValidation, ExpertTipsValidation, AdminRegValidation, LoginValidation}