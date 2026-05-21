import { parseErrorParams } from "./type";

export class ApplicationAPIException {
    parser_product_error(response: parseErrorParams): parseErrorParams {
        return response
    }

    parse_application_core_exception(response: parseErrorParams): parseErrorParams {
        if (response.error === "BAD_REQUEST") {
            response.message = "The request contains invalid data. Please check your input and try again.";
        }

        else if (response.error === "FORBIDDEN") {
            response.message = "You do not have permission to perform this action. Contact an administrator if you believe this is an error.";
        }

        else if (response.error === "UNAUTHORIZED") {
            response.message = "You are not authorized to make changes. Please log in or refresh your session and try again. Likely due to expired login session.";
        }

        else if (response.error === "NOT_FOUND") {
            response.message = "The requested resource could not be found. Verify the URL or resource ID.";
        }

        else if (response.error === "METHOD_NOT_ALLOWED") {
            response.message = "This action is not allowed for this endpoint. Check the request method or API documentation.";
        }

        else if (response.error === "INTERNAL_SERVER_ERROR") {
            response.message = "The server encountered an unexpected error. Please try again later. If the problem persists, contact support.";
        }

        return response;
    }

    parse_accounts_exception(response: parseErrorParams): parseErrorParams {
        if (response?.error === "NON_EXISTING_EMAIL") {
            response.message = "No account was found with this email address.";
        }

        else if (response?.error === "PROVIDER_MISMATCH") {
            const provider = typeof response.provider === "string" ? response.provider.toUpperCase() : ""
            const providerType = typeof response.provider_type === "string" ? response.provider_type.toUpperCase() : ""

            response.message = `This email is linked to ${provider} ${providerType}. Please sign in using ${provider}, or use a different email address.`;
        }

        else if (response?.error === "INVALID_LOGIN_CREDENTIALS") {
            response.message = "The password you entered is incorrect.";
        }

        else if (response?.error === "UNIQUE_VIOLATION") {
            response.message = `The account with given mail already exist, can't create multiple account with single email.`
        }

        else if (response?.error === "FOREIGN_KEY_VIOLATION") {
            response.message = `${response?.type}, You are making change inside store|tenant|user asset which doesn't exist, report the store owner for this issue.`
        }

        return response
    }



    parseException(response: parseErrorParams): parseErrorParams {
        // list of all parsers, 
        const errorParsers = [
            this.parse_application_core_exception,
            this.parser_product_error,
            this.parse_accounts_exception,
        ]

        // iterating each and every, error parser for proper message.
        let initial_message = response?.message
        for (let _callable of errorParsers) {
            if (initial_message != _callable(response)?.message) {
                return response
            }
        }

        // if none of the above exception matches show this message to user.
        response.message = `Something went wrong while processing your request. Please try again. If the problem persists, contact support.`
        return response
    }
}
