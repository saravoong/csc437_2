import { Schema, model } from "mongoose";
import { Reader } from "../models/models";
import { credentialModel } from "./credential-svc";

const UserSchema = new Schema<Reader>(
    {
        username: { type: String, required: true, trim: true },
        profilePicture: String,
        color: String,
    },
    { collection: "users" }
);

const UserModel = model<Reader>(
    "User",
    UserSchema
);

function index(): Promise<Reader[]> {
    return UserModel.find();
}

function get(username: String): Promise<Reader> {
    return UserModel.find({ username })
        .then((list) => list[0])
        .catch((err) => {
            throw `${username} Not Found`;
        });
}

function create(json: Reader): Promise<Reader> {
    const t = new UserModel(json);
    return t.save();
}

async function update(username: String, user: Reader): Promise<Reader> {
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
        throw `${username} not found`;
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { username },
        user,
        { new: true }
    );

    if (!updatedUser) {
        throw `${username} not updated`;
    }

    // Update credentials if username has changed
    if (user.username && user.username !== username) {
        const credUpdate = await credentialModel.findOneAndUpdate(
            { username },
            { username: user.username }
        );

        if (!credUpdate) {
            throw `Could not update credentials for ${username}`;
        }
    }

    return updatedUser;
}

function remove(username: String): Promise<void> {
    return UserModel.findOneAndDelete({ username }).then(
        (deleted) => {
            if (!deleted) throw `${username} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };