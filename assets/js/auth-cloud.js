(function(){
'use strict';
var cfg=window.LEED_SUPABASE_CONFIG||{}, prefix=(window.LEED_CONFIG&&window.LEED_CONFIG.storagePrefix)||'leed_ga_trainer_v75_';
var client=null,user=null,syncTimer=null,applying=false;
function el(id){return document.getElementById(id)}
function configured(){return cfg.url&&cfg.anonKey&&cfg.url.indexOf('PASTE_')!==0&&cfg.anonKey.indexOf('PASTE_')!==0}
function status(msg,bad){var x=el('cloud-status');if(x){x.textContent=msg;x.className='cloud-status'+(bad?' bad':'')}}
function localPayload(){var data={},i,k;for(i=0;i<localStorage.length;i++){k=localStorage.key(i);if(k&&k.indexOf(prefix)===0)data[k]=localStorage.getItem(k)}return{version:1,updated_at:new Date().toISOString(),data:data}}
function localStamp(){return localStorage.getItem(prefix+'cloud_updated_at')||''}
function setLocalStamp(v){applying=true;localStorage.setItem(prefix+'cloud_updated_at',v||new Date().toISOString());applying=false}
async function upload(){if(!client||!user||applying)return;var payload=localPayload();status('Đang đồng bộ...');var r=await client.from(cfg.table||'leed_user_data').upsert({user_id:user.id,payload:payload,updated_at:payload.updated_at},{onConflict:'user_id'});if(r.error){status('Lỗi đồng bộ: '+r.error.message,true);return}setLocalStamp(payload.updated_at);status('Đã lưu cloud lúc '+new Date().toLocaleTimeString('vi-VN'))}
function schedule(){if(!user||applying)return;clearTimeout(syncTimer);syncTimer=setTimeout(upload,900)}
async function downloadAndMerge(force){if(!client||!user)return;status('Đang tải dữ liệu cloud...');var r=await client.from(cfg.table||'leed_user_data').select('payload,updated_at').eq('user_id',user.id).maybeSingle();if(r.error){status('Không tải được cloud: '+r.error.message,true);return}if(!r.data||!r.data.payload){await upload();return}var cloud=r.data.payload, stamp=cloud.updated_at||r.data.updated_at||'';
 if(force||!localStamp()||stamp>localStamp()){
   applying=true;Object.keys(cloud.data||{}).forEach(function(k){localStorage.setItem(k,cloud.data[k])});localStorage.setItem(prefix+'cloud_updated_at',stamp);applying=false;status('Đã tải dữ liệu cloud. Đang mở lại...');setTimeout(function(){location.reload()},350);
 }else{await upload()}
}
function showUser(){var signed=!!user;el('auth-login-panel').classList.toggle('hidden',signed);el('auth-user-panel').classList.toggle('hidden',!signed);if(signed){el('auth-user-email').textContent=user.email||'Đã đăng nhập';status('Đã đăng nhập. Tự động đồng bộ đang bật.')}}
async function signIn(){var email=el('auth-email').value.trim(),pw=el('auth-password').value;if(!email||!pw){status('Nhập email và mật khẩu.',true);return}status('Đang đăng nhập...');var r=await client.auth.signInWithPassword({email:email,password:pw});if(r.error){status(r.error.message,true);return}user=r.data.user;showUser();await downloadAndMerge(false)}
async function signUp(){var email=el('auth-email').value.trim(),pw=el('auth-password').value;if(!email||pw.length<6){status('Nhập email và mật khẩu ít nhất 6 ký tự.',true);return}status('Đang tạo tài khoản...');var r=await client.auth.signUp({email:email,password:pw});if(r.error){status(r.error.message,true);return}if(r.data.session){user=r.data.user;showUser();await downloadAndMerge(false)}else status('Đã tạo tài khoản. Hãy mở email xác nhận rồi đăng nhập.')}
async function signOut(){await upload();await client.auth.signOut();user=null;showUser();status('Đã đăng xuất. Dữ liệu trên máy vẫn được giữ.')}
function bind(){el('auth-signin').onclick=signIn;el('auth-signup').onclick=signUp;el('auth-signout').onclick=signOut;el('auth-sync').onclick=function(){downloadAndMerge(true)}}
async function init(){bind();if(!configured()){status('Chưa cấu hình Supabase. Xem file HUONG_DAN_SUPABASE.md.',true);return}if(!window.supabase){status('Không tải được thư viện Supabase.',true);return}client=window.supabase.createClient(cfg.url,cfg.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});var r=await client.auth.getSession();user=r.data.session&&r.data.session.user;showUser();if(user)await downloadAndMerge(false);client.auth.onAuthStateChange(function(evt,session){user=session&&session.user;showUser()})}
var oldSet=Storage.prototype.setItem,oldRemove=Storage.prototype.removeItem;
Storage.prototype.setItem=function(k,v){oldSet.call(this,k,v);if(String(k).indexOf(prefix)===0&&String(k)!==prefix+'cloud_updated_at')schedule()};
Storage.prototype.removeItem=function(k){oldRemove.call(this,k);if(String(k).indexOf(prefix)===0)schedule()};
window.addEventListener('DOMContentLoaded',init);
})();
