use neon::prelude::*;
use port_selector::*;

pub fn is_free_port(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let port = cx.argument::<JsNumber>(0)?.value(&mut cx) as Port;
    Ok(cx.boolean(is_free(port)))
}

pub fn is_free_tcp_port(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let port = cx.argument::<JsNumber>(0)?.value(&mut cx) as Port;
    Ok(cx.boolean(is_free_tcp(port)))
}

pub fn is_free_udp_port(mut cx: FunctionContext) -> JsResult<JsBoolean> {
    let port = cx.argument::<JsNumber>(0)?.value(&mut cx) as Port;
    Ok(cx.boolean(is_free_udp(port)))
}

pub fn _random_free_port(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(random_free_port().unwrap()))
}

pub fn _random_free_tcp_port(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(random_free_tcp_port().unwrap()))
}

pub fn _random_free_udp_port(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(random_free_udp_port().unwrap()))
}

pub fn _select_from_given_port(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let port = cx.argument::<JsNumber>(0)?.value(&mut cx) as Port;
    Ok(cx.number(select_from_given_port(port).unwrap()))
}

pub fn _select_free_port(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let args = cx.argument_opt(0);

    let mut selector: Selector = Default::default();

    if args.is_some() {
        let arg = args
            .unwrap()
            .downcast::<JsObject, FunctionContext>(&mut cx)
            .unwrap();

        match arg.get_value(&mut cx, "checkTcp") {
            Err(e) => {
                eprintln!("{}", e)
            }
            Ok(value) => {
                let value_option = value.downcast::<JsBoolean, FunctionContext>(&mut cx).ok();
                if value_option.is_some() {
                    selector.check_tcp = value_option.unwrap().value(&mut cx);
                }
            }
        }

        match arg.get_value(&mut cx, "checkUdp") {
            Err(e) => {
                eprintln!("{}", e)
            }
            Ok(value) => {
                let value_option = value.downcast::<JsBoolean, FunctionContext>(&mut cx).ok();
                if value_option.is_some() {
                    selector.check_udp = value_option.unwrap().value(&mut cx);
                }
            }
        }

        match arg.get_value(&mut cx, "portFrom") {
            Err(e) => {
                eprintln!("{}", e)
            }
            Ok(value) => {
                let value_option = value.downcast::<JsNumber, FunctionContext>(&mut cx).ok();
                if value_option.is_some() {
                    selector.port_range.0 = value_option.unwrap().value(&mut cx) as Port;
                }
            }
        }

        match arg.get_value(&mut cx, "portTo") {
            Err(e) => {
                eprintln!("{}", e)
            }
            Ok(value) => {
                let value_option = value.downcast::<JsNumber, FunctionContext>(&mut cx).ok();
                if value_option.is_some() {
                    selector.port_range.1 = value_option.unwrap().value(&mut cx) as Port;
                }
            }
        }

        match arg.get_value(&mut cx, "maxRandomTimes") {
            Err(e) => {
                eprintln!("{}", e)
            }
            Ok(value) => {
                let value_option = value.downcast::<JsNumber, FunctionContext>(&mut cx).ok();
                if value_option.is_some() {
                    selector.max_random_times = value_option.unwrap().value(&mut cx) as Port;
                }
            }
        }
    }
    Ok(cx.number(select_free_port(selector).unwrap()))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("isFree", is_free_port)?;
    cx.export_function("isFreeTcp", is_free_tcp_port)?;
    cx.export_function("isFreeUdp", is_free_udp_port)?;
    cx.export_function("randomFreePort", _random_free_port)?;
    cx.export_function("randomFreeTcpPort", _random_free_tcp_port)?;
    cx.export_function("randomFreeUdpPort", _random_free_udp_port)?;
    cx.export_function("selectFromGivenPort", _select_from_given_port)?;
    cx.export_function("selectFreePort", _select_free_port)?;
    Ok(())
}
