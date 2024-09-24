
class SuccessHandler {
    static success(res, data, message = 'Operation successful') {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static created(res, data, message = 'Resource created successfully') {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    static noContent(res, message = 'No content') {
        return res.status(204).send();
    }

    // You can add more methods if needed
}

module.exports = SuccessHandler;
