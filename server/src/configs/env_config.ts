import "dotenv/config";

const JWT_SECRET: string = process.env.JWT_SECRET ?? (() => {
    throw new Error("JWT_SECRET is not defined");
})();

export default JWT_SECRET;