const request = require('request-promise')
const fs = require('fs')

const ESA_ENDPOINT_PROTOCOL = 'https'
const ESA_ENDPOINT_DOMAIN = 'api.esa.io'
export const ESA_API_INTERVAL = 12000

export class EsaClient {

  /**
   * Access token for esa.io
   */
  private readonly token: string

  /**
   * Team name (subdomain of your esa.io)
   * example: https://TEAM_NAME.esa.io/
   */
  readonly teamName: string

  constructor (teamName: string, token: string) {
    this.teamName = teamName
    this.token = token
  }

  /**
   * Upload emoji to esa.io
   * @param params
   */
  async upload (params: {name: string, filepath: string}) {
    const isPng = params.filepath.endsWith('png')
    const imageFileOptions = {
      filename: `image.${isPng ? 'png' : 'gif'}`,
      contentType: `image/${isPng ? 'png' : 'gif'}`
    }
    const options = {
      method: 'POST',
      uri: `${ESA_ENDPOINT_PROTOCOL}://${ESA_ENDPOINT_DOMAIN}/v1/teams/${this.teamName}/emojis?access_token=${this.token}`,
      formData: {
        "emoji[code]": params.name,
        "emoji[image]": {
          value: fs.createReadStream(params.filepath),
          options: imageFileOptions
        }
      }
    }
    return request(options)
  }

}
