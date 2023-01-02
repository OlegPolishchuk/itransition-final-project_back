import axios, {AxiosError} from "axios";

export const getGithubUser = async (token: string) => {
  try {
    console.log(token)
    const gitHubResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const { login, avatar_url, name } = gitHubResponse.data;
    const userData = {login, avatar_url, name};

    return userData;
  } catch (e) {
    return e as AxiosError
  }
}