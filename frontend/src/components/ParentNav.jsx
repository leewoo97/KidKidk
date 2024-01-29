import { Link, Outlet } from 'react-router-dom';
import ProfileNav from './ProfileNav';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import styles from './ParentNav.module.css';

export default function ParentNav() {
    return (
        <>
            <div className={styles.divContainer}>
                <div className={styles.layoutNav}>
                    <p className={styles.navLogo}>KIDK KIDK</p>
                    <ul className={styles.nav}>
                        <li>
                            <Link to={`main`}>메인</Link>
                        </li>
                        <li>
                            <Link to={`job`}>직업</Link>
                        </li>
                        <li>
                            <Link to={`fundsaving`}>투자/적금</Link>
                        </li>
                        <li className={styles.navLogout}>로그아웃</li>
                    </ul>
                </div>
                <div className={styles.layoutSection}>
                    <Outlet />
                </div>
                <div className={styles.layoutProfile}>
                    <ProfileNav />
                    <div className={styles.profileChildrenTabs}>
                        <Tabs variant="soft-rounded" colorScheme={'tabHover'}>
                            <TabList gap={'30px'} flexDirection={'column'}>
                                <Tab>
                                    <Link to={`/parent`}>
                                        <ul>
                                            <li>
                                                <Image
                                                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                                    alt="Green double couch with wooden legs"
                                                    borderRadius="full"
                                                    boxSize="50px"
                                                />
                                            </li>
                                            <li>신짱아</li>
                                            <li>펫시터</li>
                                        </ul>
                                    </Link>
                                </Tab>
                                <Tab>
                                    <Link to={`/parent/main`}>
                                        <ul>
                                            <li>
                                                <Image
                                                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                                    alt="Green double couch with wooden legs"
                                                    borderRadius="full"
                                                    boxSize="50px"
                                                />
                                            </li>
                                            <li>신짱구</li>
                                            <li>환경미화원</li>
                                        </ul>
                                    </Link>
                                </Tab>
                                <Tab color="tabDefault">Tab 3</Tab>
                            </TabList>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
