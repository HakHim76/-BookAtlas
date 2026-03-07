const mongoose = require("mongoose");
const coverImageBasePath = "uploads/bookCovers";
const path = require("path");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    publishDate: { type: Date, required: true },
    pageCount: { type: Number, required: true },
    coverImageName: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  },
  { timestamps: true },
);

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageName) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

module.exports = mongoose.model("Book", bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;
