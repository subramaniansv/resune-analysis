const { default: mongoose } = require("mongoose");

const hrSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
)
const hrModel = mongoose.models.hr || mongoose.model("hr",hrSchema);
module.exports = hrModel;