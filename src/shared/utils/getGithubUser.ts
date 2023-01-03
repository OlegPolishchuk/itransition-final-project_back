import axios, {AxiosError} from "axios";

const Github_get_user_url = 'https://api.github.com/user'

export const getGithubUser = async (token: string) => {
  try {
    const gitHubResponse = await axios.get(Github_get_user_url, {
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