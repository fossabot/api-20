import request from 'supertest'

import { authenticateUserTest } from '../../../__test__/utils/authenticateUser'
import { formatErrors } from '../../../__test__/utils/formatErrors'
import app from '../../../app'
import { commonErrorsMessages } from '../../../utils/config/constants'
import { randomString } from '../../../utils/random'
import { createGuild } from '../../Guilds/__test__/utils/createGuild'
import { errorsMessages } from '../post'

describe('POST /channels/guilds/:guildId', () => {
  it('succeeds with valid name/description', async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const name = 'channel-name'
    const description = 'testing channel creation'
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${result.user.type} ${result.user.accessToken}`)
      .send({ name, description })
      .expect(201)
    expect(response.body.channel).not.toBeNull()
    expect(response.body.channel.guildId).not.toBeUndefined()
    expect(response.body.channel.name).toBe(name)
    expect(response.body.channel.description).toBe(description)
  })

  it('succeeds with only channel name', async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const name = 'channel-name'
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${result.user.type} ${result.user.accessToken}`)
      .send({ name })
      .expect(201)
    expect(response.body.channel).not.toBeNull()
    expect(response.body.channel.name).toBe(name)
  })

  it('fails without name', async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${result.user.type} ${result.user.accessToken}`)
      .send({ description: 'testing channel creation' })
      .expect(400)
    const errors = formatErrors(response.body.errors)
    expect(errors.length).toEqual(3)
    expect(errors).toEqual(
      expect.arrayContaining([
        errorsMessages.name.isRequired,
        errorsMessages.name.mustBeSlug,
        commonErrorsMessages.charactersLength('name', { min: 3, max: 30 })
      ])
    )
  })

  it('fails with invalid slug name', async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${result.user.type} ${result.user.accessToken}`)
      .send({
        name: 'random channel name',
        description: 'testing channel creation'
      })
      .expect(400)
    const errors = formatErrors(response.body.errors)
    expect(errors.length).toEqual(1)
    expect(errors).toEqual(
      expect.arrayContaining([errorsMessages.name.mustBeSlug])
    )
  })

  it('fails with invalid description', async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${result.user.type} ${result.user.accessToken}`)
      .send({ name: 'channel-name', description: randomString(170) })
      .expect(400)
    const errors = formatErrors(response.body.errors)
    expect(errors.length).toEqual(1)
    expect(errors).toEqual(
      expect.arrayContaining([
        commonErrorsMessages.charactersLength('description', { max: 160 })
      ])
    )
  })

  it("fails if the user isn't the owner", async () => {
    const result = await createGuild({
      guild: { description: 'description', name: 'guild' },
      user: {
        email: 'test@test.com',
        name: 'Test'
      }
    })
    const userToken = await authenticateUserTest()
    const name = 'channel-name'
    const response = await request(app)
      .post(`/channels/guilds/${result.guild.id}`)
      .set('Authorization', `${userToken.type} ${userToken.accessToken}`)
      .send({ name, description: 'testing channel creation' })
      .expect(404)
    const errors = formatErrors(response.body.errors)
    expect(errors.length).toEqual(1)
    expect(errors).toEqual(expect.arrayContaining(['Not Found']))
  })

  it("fails if the guild does't exist", async () => {
    const userToken = await authenticateUserTest()
    const name = 'channel-name'
    const response = await request(app)
      .post('/channels/guilds/1')
      .set('Authorization', `${userToken.type} ${userToken.accessToken}`)
      .send({ name, description: 'testing channel creation' })
      .expect(404)
    const errors = formatErrors(response.body.errors)
    expect(errors.length).toEqual(1)
    expect(errors).toEqual(expect.arrayContaining(['Not Found']))
  })
})
