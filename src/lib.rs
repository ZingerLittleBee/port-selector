#![deny(clippy::all)]

use port_selector::{
    is_free, is_free_tcp, is_free_udp, random_free_port, random_free_tcp_port,
    random_free_udp_port, select_free_port, select_from_given_port, Port, Selector,
};

#[macro_use]
extern crate napi_derive;

#[napi(js_name = "isFree")]
pub fn _is_free(port: u32) -> bool {
    is_free((port as Port).into())
}

#[napi(js_name = "isFreeTcp")]
pub fn _is_free_tcp(port: u32) -> bool {
    is_free_tcp((port as Port).into())
}

#[napi(js_name = "isFreeUdp")]
pub fn _is_free_udp(port: u32) -> bool {
    is_free_udp((port as Port).into())
}

#[napi(js_name = "randomFreePort")]
pub fn _random_free_port() -> Option<u32> {
    match random_free_port() {
        Some(r) => Some(r as u32),
        None => None,
    }
}

#[napi(js_name = "randomFreeTcpPort")]
pub fn _random_free_tcp_port() -> Option<u32> {
    match random_free_tcp_port() {
        Some(r) => Some(r as u32),
        None => None,
    }
}

#[napi(js_name = "randomFreeUdpPort")]
pub fn _random_free_udp_port() -> Option<u32> {
    match random_free_udp_port() {
        Some(r) => Some(r as u32),
        None => None,
    }
}

#[napi(js_name = "selectFromGivenPort")]
pub fn _select_from_given_port(port: u32) -> Option<u32> {
    match select_from_given_port(port as Port) {
        Some(r) => Some(r as u32),
        None => None,
    }
}

#[napi(object)]
pub struct _Selector {
    pub check_tcp: Option<bool>,
    pub check_udp: Option<bool>,
    pub port_from: Option<u32>,
    pub port_to: Option<u32>,
    pub max_random_times: Option<u32>,
}

#[napi]
pub fn _select_free_port(selector: Option<_Selector>) -> Option<u32> {
    let mut _selector: Selector = Default::default();

    if selector.is_some() {
        match selector.unwrap() {
            _Selector {
                check_tcp,
                check_udp,
                port_from,
                port_to,
                max_random_times,
            } => {
                if check_tcp.is_some() {
                    _selector.check_tcp = check_tcp.unwrap();
                }
                if check_udp.is_some() {
                    _selector.check_udp = check_udp.unwrap();
                }
                if port_from.is_some() {
                    _selector.port_range.0 = port_from.unwrap() as Port;
                }
                if port_to.is_some() {
                    _selector.port_range.1 = port_to.unwrap() as Port;
                }
                if max_random_times.is_some() {
                    _selector.max_random_times = max_random_times.unwrap() as Port;
                }
            }
        }
    }

    match select_free_port(_selector) {
        Some(p) => Some(p as u32),
        None => None,
    }
}
