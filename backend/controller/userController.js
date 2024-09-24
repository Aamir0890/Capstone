const userService=require('../services/user')
const userSchema=require('../utils/validation/userSchema')
const ErrorHandler=require('../utils/errors/errorHandler')
const SuccessHandler=require('../utils/errors/successHandler')

exports.createUser = async (req, res) => {
    try {
        const result = userSchema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
            return ErrorHandler.validationError(res, errors);
        }

        const user = await userService.createUser(req.body);
        return SuccessHandler.created(res, user, 'User created successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = userSchema.pick({ email: true, password: true }).safeParse({ email, password });

        if (!result.success) {
            const errors = result.error.errors.map(err => err.message);
            return ErrorHandler.validationError(res, errors);
        }

        const user = await userService.loginUser(email, password);
        return SuccessHandler.success(res, user, 'User logged in successfully');
    } catch (error) {
        console.log(error);
        return ErrorHandler.internalServerError(res, error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await userService.getUserById(id);

        if (!user) {
            return ErrorHandler.notFound(res, 'User not found');
        }

        return SuccessHandler.success(res, user, 'User retrieved successfully');
    } catch (error) {
        return ErrorHandler.internalServerError(res);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await userService.updateUser(id, req.body);

        if (!user) {
            return ErrorHandler.notFound(res, 'User not found');
        }

        return SuccessHandler.success(res, user, 'User updated successfully');
    } catch (error) {
        return ErrorHandler.internalServerError(res);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.user.id;
        const deleted = await userService.deleteUser(id);

        if (!deleted) {
            return ErrorHandler.notFound(res, 'User not found');
        }

        return SuccessHandler.noContent(res);
    } catch (error) {
        return ErrorHandler.internalServerError(res);
    }
};

