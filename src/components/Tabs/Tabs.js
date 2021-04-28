import React, { useState } from 'react';
import { Badge, Tab, Tabs } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Card from '../Card/Card';

const MyTabs = () => {
  const [key, setKey] = useState('contacts');

  const renderTabContent = (passed) => {
    return <TabContent>{passed}</TabContent>;
  };

  return (
    <TabsStyle id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey='contacts' title='CONTACTS'>
        <TabContent>
          <Card>
            <h4>Amogh Gases Pvt. Ltd</h4>
            <p>
              <BadgeStyle variant='secondary'>Verified</BadgeStyle> Updated 10
              mins ago
            </p>
            <FlexBox>
              <div>
                <h5>Mahesh</h5>
                <h6>9788345444</h6>
              </div>
              <IconWraaper>
                <FaPhoneAlt />
              </IconWraaper>
            </FlexBox>
          </Card>
        </TabContent>
        s
      </Tab>
      <Tab eventKey='chat groups' title='CHAT GROUPS'>
        {renderTabContent('CHAT GROUPS')}
      </Tab>
    </TabsStyle>
  );
};

export default MyTabs;

const TabsStyle = styled(Tabs)`
  background: #fff;
  border: none;
  margin: 0;
  padding: 0;
  > .nav-link {
    border: none !important;
    margin: 0 !important;
    color: grey;
    font-weight: bold !important;
    transistion: 1s ease-out;
    position: relative;

    &: hover {
      color: grey;
      opacity: 0.5;
    }

    &.active {
      color: blue;
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        left: 0;
        bottom: 0;
        background-color: blue;
      }
    }
  }
`;

const TabContent = styled.div`
  padding: 1rem;
`;

const BadgeStyle = styled(Badge)`
  display: inline-block;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IconWraaper = styled.div`
  background: blue;
  color: white;
  padding: 0.5rem;
  border-radius: 100%;
`;
