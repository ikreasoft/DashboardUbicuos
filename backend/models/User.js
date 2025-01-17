const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

// Definición del esquema de usuario
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  fullname: {
    type: String,
    required: [true, "El nombre completo es obligatorio."],
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio."],
    unique: [true, "El correo electrónico ya está registrado."],
    match: [/.+\@.+\..+/, "Por favor, proporciona un correo electrónico válido."],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pre-save para cifrar la contraseña
UserSchema.pre("save", function (next) {
  const user = this;

  // Si la contraseña no se ha modificado, no hacer nada
  if (!user.isModified("password")) return next();

  // Generar salt para el cifrado
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Generar hash de la contraseña
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash; // Reemplazar la contraseña con el hash
      next();
    });
  });
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exportar el modelo
module.exports = mongoose.model("User", UserSchema);
