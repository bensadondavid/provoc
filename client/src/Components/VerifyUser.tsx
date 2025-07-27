export interface VerifiedUser {
  isAuthenticated: boolean;
  user?: {
    userId: string;
    username: string;
    userEmail: string;
  };
}

export const verifyUser = async (
  urlBack: string
): Promise<VerifiedUser> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { isAuthenticated: false };

    const response = await fetch(`${urlBack}/users/protected`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message === 'Expired Token') {
        localStorage.removeItem('token');
      }
      console.log(data.message);
      return { isAuthenticated: false };
    }

    const { userId, username, userEmail } = data;
    return {
      isAuthenticated: true,
      user: { userId, username, userEmail }
    };
  } catch (err) {
    console.log(err);
    return { isAuthenticated: false };
  }
};