"use strict";

let formatVars = new Map<string, string>([
        ["%B", "bytes_read"],
        ["%CC", "captured_request_cookie"],
        ["%CS","captured_response_cookie"],
        ["%H","hostname"],
        ["%HM","http_method"],
        ["%HP","http_request_uri_without_query_string"],
        ["%HPO","http_path_only"],
        ["%HQ","http_request_uri_query_string"],
        ["%HU","http_request_uri"],
        ["%HV","http_version"],
        ["%ID","unique_id"],
        ["%ST","status_code"],
        ["%T","gmt_date_time"],
        ["%Ta","active_time"],
        ["%Tc","Tc"],
        ["%Td","Td = Tt - (Tq + Tw + Tc + Tr)"],
        ["%Tl","local_date_time"],
        ["%Th","connection_handshake_time"],
        ["%Ti","idle_time_before_the_http_request"],
        ["%Tq","Th + Ti + TR"],
        ["%TR","time_to_receive_full_request"],
        ["%Tr","Tr"],
        ["%Ts","timestamp"],
        ["%Tt","Tt"],
        ["%Tu","Tu"],
        ["%Tw","Tw"],
        ["%U","bytes_uploaded"],
        ["%ac","actconn"],
        ["%b","backend_name"],
        ["%bc","beconn"],
        ["%bi","backend_source_ip"],
        ["%bp","backend_source_port"],
        ["%bq","backend_queue"],
        ["%ci","client_ip"],
        ["%cp","client_port"],
        ["%f ","frontend_name"],
        ["%fc","feconn"],
        ["%fi","frontend_ip"],
        ["%fp","frontend_port"],
        ["%ft","frontend_name_transport"],
        ["%lc","frontend_log_counter"],
        ["%hr","captured_request_headers"],
        ["%hrl ","captured_request_headers_CLF_style"],
        ["%hs","captured_response_headers"],
        ["%hsl ","captured_response_headers_CLF_style"],
        ["%ms","accept date milliseconds (left-padded wit"],
        ["%pid ","PID"],
        ["%r","http_request"],
        ["%rc","retries"],
        ["%rt","request_counter (HTTP req or TCP session)"],
        ["%s","server_name"],
        ["%sc","srv_conn     (server concurrent connectio"],
        ["%si","server_IP                   (target addre"],
        ["%sp","server_port                 (target addre"],
        ["%sq","srv_queue"],
        ["%sslc","ssl_ciphers (ex: AES-SHA)"],
        ["%sslv","ssl_version (ex: TLSv1)"],
        ["%t","date_time      (with millisecond resoluti"],
        ["%tr","date_time of HTTP request"],
        ["%trg","gmt_date_time of start of HTTP request "],
        ["%trl","local_date_time of start of HTTP request "],
        ["%ts","termination_state"],
        ["%tsc","termination_state_with_cookie_status"],
    ]);

let defaultLog = new Set<string>([
    "%ci", "%cp", "%tr", "%ft", "%b", "%s", "%TR", "%Tw", "%Tc", "%Tr", "%Ta", "%ST", "%B",
    "%CC", "%CS", "%tsc", "%ac" ,"%fc", "%bc", "%sc", "%rc", "%sq", "%bq", "%hr", "%hs", "%{+Q}r",
    "%sslv", "%sslc"
])

function checkChanged() {
    let output = "{ ";
    for (let i = 0; i < checkboxes.length; i++) {
        const element = checkboxes[i] as HTMLInputElement;
        if (!element.checked) {
            continue
        }
        let v = element.id.trim();
        output += '"' + formatVars.get(v) + '" : "' + v + '", '
    }
    output = output.replace(/, $/, "") + "}";
    let logFormat = document.getElementById("log-format")!;
    logFormat.innerText = output;
}

const checkboxes = document.querySelectorAll("input[type=checkbox]");

for (let i = 0; i < checkboxes.length; i++) {
    const element = checkboxes[i] as HTMLInputElement;
    if (defaultLog.has(element.id.trim())) {
        element.checked = true;
    }
    element.addEventListener("click", checkChanged);
}

checkChanged()
