/**
 * Created by mao on 13-11-6.
 */

exports.createUser = function (name, password) {
    this.name = name;
    this.password = password;
    console.log("userdo create");
    return this;
};
