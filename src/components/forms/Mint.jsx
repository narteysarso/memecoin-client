import { Button, Form, Input , message} from "antd";
import { useEffect, useState } from "react";
import { mintToken } from "../../services/contract";

export default function MintForm() {
    const [formdata, setFormData] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOnFinish = (e) => {
        setFormData(e);
    }

    useEffect( () => {
        (async() => {
            try {
                if(!formdata){
                    return ;
                }
                setLoading(true);

                await mintToken(formdata.amount);
                
                form.resetFields();

            } catch (error) {
                setError(error.message)
            }finally{
                setLoading(false);
            }
        })()
    }, [formdata]);


    useEffect( () => {
        error && message.error(error);
    },[error]);
    return (
        <Form form={form} onFinish={handleOnFinish} className="form">
            <Form.Item
                name="amount"
                rules={[{ required: true, message: 'Please input amount of tokens' }]}
            >
                <Input placeholder="0.000FXC"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" block htmlType="submit" loading={loading}>MINT TOKEN</Button>
            </Form.Item>
        </Form>
    )
}