import { Button, Card, Col, Divider, Row, Tag, Typography } from "antd";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import BurnForm from "../components/forms/Burn";
import MintForm from "../components/forms/Mint";
import TransferForm from "../components/forms/Transfer";
import { connectWallet, getOwner, getSymbol, getTokenName, getTotalSupply, getContractAddress, listenTokenBurnedEvent, listenTokenMintedEvent, unscribeTokenMintedEvent, unscribeTokenBurnedEvent } from "../services/contract";

export default function Home() {
    const [wallet, setWallet] = useState("ddssd");
    const [contractAddress, setContractAddress] = useState(null);
    const [ownerAddress, setOwnerAddress] = useState(null);
    const [totalSupply, setTotalSupply] = useState(0);
    const [ticker, setTicker] = useState("");
    const [coin, setCoin] = useState("");
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);


    useLayoutEffect( () => {
        listenTokenBurnedEvent(
            (_, amount) => {
                setTotalSupply(prev => (parseFloat(prev) - parseFloat(amount)).toFixed(2));
            }
        );
        listenTokenMintedEvent(
            (_, amount) => {
                setTotalSupply(prev => (parseFloat(prev) + parseFloat(amount)).toFixed(2));
            }
        );

        return () => {
            unscribeTokenMintedEvent();
            unscribeTokenBurnedEvent();
        }
    }, []);

    useEffect(() => {
        (async () => {
            // Promise.all()
           
            try {
                setWallet(await connectWallet());
                setOwnerAddress(await getOwner());
                setTotalSupply(await getTotalSupply());
                setTicker(await getSymbol());
                setCoin(await getTokenName() + '🦊');
                setContractAddress(getContractAddress());
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        })();
    }, []);

    useEffect(() => {
        setIsOwner(ownerAddress?.toLowerCase() === wallet?.toLowerCase());
    }, [ownerAddress, wallet]);

    return (
        <Row justify="center" align="center" style={{ marginTop: '2vh' }}>
            <Col xs={24} sm={18} md={12}>
                <Card title={<Typography.Title level={5}>Meme Coin Project | <Tag color="magenta">This project run on the Rinkeby Test Net</Tag></Typography.Title>}>
                    <Row justify="space-around" >
                        <Col xs={24} md={19}>
                            <Row>
                                <Col xs={24} >
                                    <Row >
                                        <Col xs={24} md={8}>
                                            <Typography.Title level={5}>Coin: {coin}</Typography.Title>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Typography.Title level={5}>Ticker: {ticker}</Typography.Title>

                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Typography.Title level={5}>Total Supply: {totalSupply}</Typography.Title>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} >
                                    <TransferForm />
                                </Col>
                                <Col xs={24} >
                                    <BurnForm />
                                </Col>
                                {isOwner && <Col xs={24} >
                                    <MintForm />
                                </Col>}
                                <Col xs={24} >

                                    <Typography.Title level={5}>Contract Address: {contractAddress} </Typography.Title>
                                    <Typography.Title level={5}>Token Owner Address: {ownerAddress} </Typography.Title>
                                    <Typography.Title level={5}>Your Wallet Address: {wallet}</Typography.Title>
                                    <Divider />
                                    <Button shape="round" size="large">{wallet ? "Wallet Connected 🔒" : "Connect Wallet 🔑"}</Button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                </Card>
            </Col>
        </Row>
    )
}