'use Client';

export const apiGet = async(
  endpoint: string,
  params?: string,
) => {
//   const config: RequestInit;

  
    const config = {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 476223559a5fd1c06e552a64ab29c0273903d706a85d5f343d39fedc345dadfa5ef0a6c3d7150b30889940be448c265ea66d67ad1db01f1d6ccea5816995dc81cca242ae3b9240fbb2f8b22451de0229d52be19c0f64696a1964511967ba3715e0bb1f4a8ade18b33a014b0f44129bf166a86166001f94e20ca49a51ff9c0f2a`,
      },
    };
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}${endpoint}${params || ""}`,
      config
    );

    if (!response.ok) {
      return response.json();
    }

    const data = await response.json();

    // Return the data in all other cases
    return data ;
  } catch (error) {
    // Return a consistent error response
    console.log('error =>',error);
    
    return {
      StatusCode: 500,
      Data: null,
      Message: "An error occurred during the GET request.",
      IsSuccess: false,
    };
  }
};