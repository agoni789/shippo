import { List, Image } from 'antd-mobile'
import styled from 'styled-components'
import avatar from '~/assets/avatar.png'
import Container from '~/components/container'
import Header from '~/components/header'
import Main from '~/components/main'
import { WhiteSpace } from '~/components/white-space'

const StyledList = styled(List)`
  .adm-list-item-content-prefix {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`

export const WxMyPage = () => {
  return (
    <Container direction="vertical">
      <Header
        style={{
          height: '45px',
          lineHeight: '45px',
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        互动
      </Header>
      <Main>
        <WhiteSpace size={15} />
        <StyledList>
          <List.Item
            prefix={
              <Image
                src={avatar}
                style={{ borderRadius: '25px' }}
                fit="cover"
                width="50px"
                height="50px"
              />
            }
          >
            暂无昵称
          </List.Item>
        </StyledList>
        <WhiteSpace size={15} />
        <List>
          <List.Item onClick={() => {}}>浏览记录</List.Item>
          <List.Item onClick={() => {}}>通知</List.Item>
          <List.Item onClick={() => {}}>设置</List.Item>
        </List>
      </Main>
    </Container>
  )
}

export default WxMyPage
