import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { transferToken } from "../../services/contract";

export default function TransferForm() {
    
    const [formdata, setFormData] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleOnFinish = (e) => {
        setFormData(e);
    }

    useEffect( () => {
        (async() => {
            //send to block chain
            try {
                if(!formdata){
                    return ;
                }
                setLoading(true);
                
                await transferToken(formdata.address, formdata.amount);
                
                form.resetFields();

            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        })()
    }, [formdata])
    return (
        <Form form={form} onFinish={handleOnFinish} className="form">
            <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please input wallet address' }]}
            >
                <Input placeholder="Wallet Address"/>
            </Form.Item>
            <Form.Item
                name="amount"
                rules={[{ required: true, message: 'Please input amount of tokens ' }]}
            >
                <Input placeholder="0.000 FXC"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" block htmlType="sumbit" loading={loading}>TRANSFER TOKEN</Button>
            </Form.Item>
        </Form>
    )
}