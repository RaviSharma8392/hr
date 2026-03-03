export const getUserDisplayName = (user) => {
  if (!user) return "HR User";
  if (user.firstName && user.lastName)
    return `${user.firstName} ${user.lastName}`;
  if (user.email) return user.email.split("@")[0];
  return "HR User";
};

export const getUserAvatarUrl = (user, displayName) => {
  return (
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${displayName.replace(
      " ",
      "+"
    )}&background=008BDC&color=fff&font-size=0.35&bold=true`
  );
};