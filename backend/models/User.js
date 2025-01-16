const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

// Definición del esquema de usuario
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio."],
    index: {
      unique: true,
      sparse: true, // Permite índices únicos con valores nulos
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  fullname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio."],
    unique: [true, "El correo electrónico ya está registrado."], // Garantiza que el correo no se repita
    match: [/.+\@.+\..+/, "Por favor, proporciona un correo electrónico válido."],
  },
  role: {
    type: String,
    required: true,
    default: "user", // Valor predeterminado para el rol
    enum: ["user", "admin"], // Define roles válidos
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  Preferences: {
    favoriteColor: {
      type: String,
      trim: true,
      default: null,
    },
  },
});

// Middleware pre-save para cifrar la contraseña antes de guardarla
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
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error("Error al comparar contraseñas:", err);
    throw new Error("Error al comparar contraseñas.");
  }
};

// Middleware post-save para realizar acciones después de guardar
UserSchema.post("save", function (doc, next) {
  console.log(`Nuevo usuario registrado: ${doc.username}`);
  next();
});

module.exports = mongoose.model("User", UserSchema);
