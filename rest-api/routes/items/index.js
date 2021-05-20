const express = require("express");
const app = express.Router();

const api = require("./api.js");
const authUser = require("../../middlewares/index.js").authUser;

/**
 * IMPORTANT: make sure to always send bad response from a known error
 *            catch error and return to be a suitable response instead
 * @param error, expected type to be a object {userNotFound: true}, etc.
 * else @returns/response {submitError: true}
 */
/// ITEM API ENDPOINT GOES HERE

app.post("/items/submit-new-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.title) {
            throw { titleRequiredError: true };
        } else if (req.body.title.length > 80) {
            throw { titleTooLongError: true };
        } else if (req.body.url && req.body.text) {
            throw { urlAndTextError: true };
        } else if (req.body.text.length > 5000) {
            throw { textTooLongError: true };
        }

        const response = await api.submitNewItem(
            req.body.title,
            req.body.url,
            req.body.text,
            res.locals
        );
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.get("/items/get-item-by-id", authUser, async (req, res) => {
    try {
        if (!req.query.id) {
            throw { notFoundError: true, authUser: res.locals };
        }

        const response = await api.getItemById(req.query.id, res.locals);
        response.authUser = res.locals;

        res.json(response);
    } catch (error) {
        // console.log(error);
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.post("/items/upvote-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        const response = await api.upvoteItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.put("/items/unvote-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        response = await api.unvoteItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.post("/items/favorite-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        response = await api.favoriteItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.put("/items/unfavorite-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        const response = await api.unfavoriteItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.post("/items/hide-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        const response = await api.hideItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.put("/items/unhide-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        const response = await api.unhideItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            res.json(error);
        } else {
            res.json({ submitError: true });
        }
    }
});

app.get("/items/get-edit-item-page-data", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { notAllowedError: true, authUser: res.locals };
        } else if (!req.query.id) {
            throw { notFoundError: true, authUser: res.locals };
        }

        const response = await api.getEditItemPageData(
            req.query.id,
            res.locals
        );
        response.authUser = res.locals;
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.put("/items/edit-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { authError: true };
        } else if (!req.body.id || !req.body.newItemTitle) {
            throw { submitError: true };
        } else if (req.body.newItemTitle.length > 80) {
            throw { titleTooLongError: true };
        } else if (req.body.newItemText.length > 5000) {
            throw { textTooLongError: true };
        }

        const response = await api.editItem(
            req.body.id,
            req.body.newItemTitle,
            req.body.newItemText,
            res.locals
        );
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.get("/items/get-delete-item-page-data", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { notAllowedError: true, authUser: res.locals };
        } else if (!req.query.id) {
            throw { notFoundError: true, authUser: res.locals };
        }

        const response = await api.getDeleteItemPageData(
            req.query.id,
            res.locals
        );
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.put("/items/delete-item", authUser, async (req, res) => {
    try {
        if (!res.locals.userSignedIn) {
            throw { notAllowedError: true };
        } else if (!req.body.id) {
            throw { submitError: true };
        }

        const response = await api.deleteItem(req.body.id, res.locals);
        res.json(response);
    } catch (error) {
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.get("/items/get-ranked-items-by-page", authUser, async (req, res) => {
    try {
        if (!req.query.page) {
            throw { getDataError: true, authUser: res.locals };
        }

        const response = await api.getRankedItemsByPage(
            req.query.page,
            res.locals
        );

        response.authUser = res.locals;
        res.json(response);
    } catch (error) {
        // console.log("ERR:", error);
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.get("/items/get-newest-items-by-page", authUser, async (req, res) => {
    try {
        if (!req.query.page) {
            throw { getDataError: true, authUser: res.locals };
        }

        const response = await api.getNewestItemsByPage(
            req.query.page,
            res.locals
        );

        response.authUser = res.locals;
        res.json(response);
    } catch (error) {
        // console.log("ERR:", error);
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.get("/items/get-ranked-show-items-by-page", authUser, async (req, res) => {
    try {
        if (!req.query.page) {
            throw { getDataError: true, authUser: res.locals };
        }

        const response = await api.getRankedShowItemsByPage(
            req.query.page,
            res.locals
        );
        response.authUser = res.locals;
        res.json(response);
    } catch (error) {
        // console.log("ERR:", error);
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

app.get("/items/get-newest-show-items-by-page", authUser, async (req, res) => {
    try {
        if (!req.query.page) {
            throw { getDataError: true, authUser: res.locals };
        }

        const response = await api.getNewestShowItemsByPage(
            req.query.page,
            res.locals
        );
        response.authUser = res.locals;
        res.json(response);
    } catch (error) {
        // console.log("ERR:", error);
        if (!(error instanceof Error)) {
            error.authUser = res.locals;
            res.json(error);
        } else {
            res.json({ getDataError: true, authUser: res.locals });
        }
    }
});

module.exports = app;
