import User from "../Schema/UserSchema.js";
import generateToken from "../utils/generateToken.js";


const register = async (req, res) => {
    const { user_name, email, password, profilepic } = req.body;
    const emailexists = await User.findOne({ email });
    if (!user_name || !email || !password) {
        return res.status(200).json({ message: "Please Fill all the details", status: "Failed" });
    }

    if (emailexists) {
        return res.status(200).json({ message: "email already exists!", status: "Failed" });
    }
    try {
        const user = await new User({
            user_name,
            email,
            password,
            profilepic: profilepic,
        });
        const result = await user.save();
        if (result) {
            return res.status(200).json({ message: "Registration Successfully.Welcome!!", status: "Success" });
        }
    } catch (error) {
        return res.status(200).json({ message: error, status: "Failed" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (!email || !password) {
            return res.status(404).json({ message: "Please Fill all the details" });
        }
        if (user && (user.password === password)) {
            res.status(200).json({
                message: "Successfully Logged In", status: "Success",
                result: {
                    id: user._id,
                    user_name: user.user_name,
                    location: user?.location ?? "",
                    description: user?.description ?? "",
                    email: user.email,
                    token: generateToken(user._id),
                    pic: user.pic,
                }
            });
        } else {
            return res.status(200).json({ message: "Invalid Credentials", status: "Failed" });
        }
    } catch (error) {
        return res.status(200).json({ message: "Something went Wrong", status: "Failed" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

        if (result) {
            return res.status(200).json({
                message: "Profile Updated Successfully", status: "Success", result: {
                    id: result._id,
                    user_name: result.user_name,
                    location: result?.location ?? "",
                    description: result?.description ?? "",
                    email: result.email,
                    token: generateToken(result._id) ?? "",
                    pic: result.pic,
                }
            });
        }
    } catch (error) {
        console.log({ error });
        return res.status(200).json({ message: "Something went Wrong", status: "Failed", });
    }
}

export { register, login, updateProfile };