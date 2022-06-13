import { Button, Input, List, Toast } from 'antd-mobile'
import React, { useMemo, useState } from 'react'
import { COLOR_PINK } from '~/constants/color'
import { services } from '@shippo/sdk-services'
import { checkPhone, checkQQEmail, checkSmsCode } from '@shippo/sdk-utils'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userAction, userSelector } from '@shippo/sdk-stores'
import { useMount } from 'ahooks'

const StyledList = styled(List)`
  > .adm-list-inner > .adm-list-item:not(:first-child) > .adm-list-item-content {
    border-bottom: unset;
  }
`

export const Page_passport = () => {
  const userInfo = useSelector(userSelector.infoGetter())

  const history = useNavigate()
  const dispatch = useDispatch()

  const [_phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const phone = useMemo(() => _phone.replace(/\s/g, ''), [_phone])

  const handleLogon = async () => {
    console.log('handleLogon', { phone, code })

    if (!checkSmsCode(code)) {
      Toast.show({
        icon: 'fail',
        content: '短信验证码格式错误',
      })
      return
    }

    // 如果是qq邮箱
    if (checkQQEmail(phone)) {
      const { data } = await services.user.login({
        email: phone,
        code,
      })
      window.localStorage.setItem('__PASSPORT', data.resource.passport)
      window.localStorage.setItem('__USER_INFO', JSON.stringify(data.resource))
      dispatch(userAction.userUpdateInfo(data.resource))
      history('/', { replace: true })
      console.log('jump')
      return
    }

    if (!checkPhone(phone)) {
      Toast.show({
        icon: 'fail',
        content: '手机号格式错误',
      })
      return
    }

    try {
      const { data } = await services.user.login({
        phone,
        code,
      })
      window.localStorage.setItem('__PASSPORT', data.resource.passport)
      window.localStorage.setItem('__USER_INFO', JSON.stringify(data.resource))
      dispatch(userAction.userUpdateInfo(data.resource))
      history('/', { replace: true })
      console.log('jump')
    } catch (error: any) {
      console.error(error)
      Toast.show({
        icon: 'fail',
        content: error.data.message,
      })
    }
  }

  const handleSmsSend = () => {
    console.log('handleSmsSend', { phone })

    const timeout = Number(window.localStorage.getItem('captcha_timeout'))
    const now = new Date().getTime()
    console.log({ timeout, now })
    if (now - timeout < 6000 * 3) {
      Toast.show({
        icon: 'fail',
        content: '点的太快了，请过三分钟再尝试。',
      })
      return
    }

    // 如果是qq邮箱
    if (checkQQEmail(phone)) {
      window.localStorage.setItem('captcha_timeout', String(new Date().getTime()))
      services.captcha.send({ email: phone })
    } else {
      if (!checkPhone(phone)) {
        Toast.show({
          icon: 'fail',
          content: '手机号格式错误',
        })
        return
      }
      try {
        window.localStorage.setItem('captcha_timeout', String(new Date().getTime()))
        services.captcha.send({ phone })
      } catch (error: any) {
        console.error(error)
        Toast.show({
          icon: 'fail',
          content: error.data.message,
        })
        return
      }
    }

    Toast.show({
      icon: 'success',
      content: '验证码已经发送',
    })
  }

  useMount(() => {
    if (userInfo.uid > 0) {
      history('/', { replace: true })
    }
  })

  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '80px',
          textAlign: 'center',
          lineHeight: '80px',
          fontSize: '30px',
        }}
      >
        Shippo
      </Header>
      <Main>
        <StyledList
          style={{
            '--prefix-width': '6em',
            border: 'unset',
          }}
        >
          <List.Item prefix="手机号">
            <Input
              placeholder="请输入手机号"
              clearable
              value={_phone}
              onChange={(value) => setPhone(value)}
            />
          </List.Item>
          <List.Item prefix="短信验证码" extra={<span onClick={handleSmsSend}>发送验证码</span>}>
            <Input
              placeholder="请输入验证码"
              clearable
              value={code}
              onChange={(value) => setCode(value.substring(0, 6))}
            />
          </List.Item>
          <List.Item
            style={{
              backgroundColor: '#f5f5f9',
            }}
          >
            <Button
              block
              style={{ background: COLOR_PINK, color: '#fff' }}
              size="large"
              onClick={handleLogon}
            >
              登陆
            </Button>
          </List.Item>
        </StyledList>
      </Main>
    </Container>
  )
}

export default Page_passport
