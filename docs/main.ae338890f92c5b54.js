"use strict";
(self.webpackChunkavia_angular = self.webpackChunkavia_angular || []).push([
	[590],
	{
		63: () => {
			let Ce = null,
				Ks = 1;
			const ur = Symbol("SIGNAL");
			function _e(e) {
				const t = Ce;
				return (Ce = e), t;
			}
			function tg(e) {
				if ((!yi(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== Ks)) {
					if (!e.producerMustRecompute(e) && !Qc(e))
						return (e.dirty = !1), void (e.lastCleanEpoch = Ks);
					e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Ks);
				}
			}
			function Qc(e) {
				Br(e);
				for (let t = 0; t < e.producerNode.length; t++) {
					const n = e.producerNode[t],
						r = e.producerLastReadVersion[t];
					if (r !== n.version || (tg(n), r !== n.version)) return !0;
				}
				return !1;
			}
			function ea(e, t) {
				if (
					((function cg(e) {
						(e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
					})(e),
					Br(e),
					1 === e.liveConsumerNode.length)
				)
					for (let r = 0; r < e.producerNode.length; r++)
						ea(e.producerNode[r], e.producerIndexOfThis[r]);
				const n = e.liveConsumerNode.length - 1;
				if (
					((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
					(e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
					e.liveConsumerNode.length--,
					e.liveConsumerIndexOfThis.length--,
					t < e.liveConsumerNode.length)
				) {
					const r = e.liveConsumerIndexOfThis[t],
						o = e.liveConsumerNode[t];
					Br(o), (o.producerIndexOfThis[r] = t);
				}
			}
			function yi(e) {
				return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
			}
			function Br(e) {
				(e.producerNode ??= []), (e.producerIndexOfThis ??= []), (e.producerLastReadVersion ??= []);
			}
			let lg = null;
			function pe(e) {
				return "function" == typeof e;
			}
			function Xc(e) {
				const n = e((r) => {
					Error.call(r), (r.stack = new Error().stack);
				});
				return (n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n;
			}
			const Jc = Xc(
				(e) =>
					function (n) {
						e(this),
							(this.message = n
								? `${n.length} errors occurred during unsubscription:\n${n
										.map((r, o) => `${o + 1}) ${r.toString()}`)
										.join("\n  ")}`
								: ""),
							(this.name = "UnsubscriptionError"),
							(this.errors = n);
					},
			);
			function Kc(e, t) {
				if (e) {
					const n = e.indexOf(t);
					0 <= n && e.splice(n, 1);
				}
			}
			class at {
				constructor(t) {
					(this.initialTeardown = t),
						(this.closed = !1),
						(this._parentage = null),
						(this._finalizers = null);
				}
				unsubscribe() {
					let t;
					if (!this.closed) {
						this.closed = !0;
						const { _parentage: n } = this;
						if (n)
							if (((this._parentage = null), Array.isArray(n))) for (const i of n) i.remove(this);
							else n.remove(this);
						const { initialTeardown: r } = this;
						if (pe(r))
							try {
								r();
							} catch (i) {
								t = i instanceof Jc ? i.errors : [i];
							}
						const { _finalizers: o } = this;
						if (o) {
							this._finalizers = null;
							for (const i of o)
								try {
									gg(i);
								} catch (s) {
									(t = t ?? []), s instanceof Jc ? (t = [...t, ...s.errors]) : t.push(s);
								}
						}
						if (t) throw new Jc(t);
					}
				}
				add(t) {
					var n;
					if (t && t !== this)
						if (this.closed) gg(t);
						else {
							if (t instanceof at) {
								if (t.closed || t._hasParent(this)) return;
								t._addParent(this);
							}
							(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t);
						}
				}
				_hasParent(t) {
					const { _parentage: n } = this;
					return n === t || (Array.isArray(n) && n.includes(t));
				}
				_addParent(t) {
					const { _parentage: n } = this;
					this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
				}
				_removeParent(t) {
					const { _parentage: n } = this;
					n === t ? (this._parentage = null) : Array.isArray(n) && Kc(n, t);
				}
				remove(t) {
					const { _finalizers: n } = this;
					n && Kc(n, t), t instanceof at && t._removeParent(this);
				}
			}
			at.EMPTY = (() => {
				const e = new at();
				return (e.closed = !0), e;
			})();
			const hg = at.EMPTY;
			function pg(e) {
				return (
					e instanceof at || (e && "closed" in e && pe(e.remove) && pe(e.add) && pe(e.unsubscribe))
				);
			}
			function gg(e) {
				pe(e) ? e() : e.unsubscribe();
			}
			const cr = {
					onUnhandledError: null,
					onStoppedNotification: null,
					Promise: void 0,
					useDeprecatedSynchronousErrorHandling: !1,
					useDeprecatedNextContext: !1,
				},
				ta = {
					setTimeout(e, t, ...n) {
						const { delegate: r } = ta;
						return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
					},
					clearTimeout(e) {
						const { delegate: t } = ta;
						return (t?.clearTimeout || clearTimeout)(e);
					},
					delegate: void 0,
				};
			function mg(e) {
				ta.setTimeout(() => {
					const { onUnhandledError: t } = cr;
					if (!t) throw e;
					t(e);
				});
			}
			function el() {}
			const f0 = tl("C", void 0, void 0);
			function tl(e, t, n) {
				return { kind: e, value: t, error: n };
			}
			let lr = null;
			function na(e) {
				if (cr.useDeprecatedSynchronousErrorHandling) {
					const t = !lr;
					if ((t && (lr = { errorThrown: !1, error: null }), e(), t)) {
						const { errorThrown: n, error: r } = lr;
						if (((lr = null), n)) throw r;
					}
				} else e();
			}
			class nl extends at {
				constructor(t) {
					super(),
						(this.isStopped = !1),
						t ? ((this.destination = t), pg(t) && t.add(this)) : (this.destination = D0);
				}
				static create(t, n, r) {
					return new ol(t, n, r);
				}
				next(t) {
					this.isStopped
						? il(
								(function p0(e) {
									return tl("N", e, void 0);
								})(t),
								this,
						  )
						: this._next(t);
				}
				error(t) {
					this.isStopped
						? il(
								(function h0(e) {
									return tl("E", void 0, e);
								})(t),
								this,
						  )
						: ((this.isStopped = !0), this._error(t));
				}
				complete() {
					this.isStopped ? il(f0, this) : ((this.isStopped = !0), this._complete());
				}
				unsubscribe() {
					this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
				}
				_next(t) {
					this.destination.next(t);
				}
				_error(t) {
					try {
						this.destination.error(t);
					} finally {
						this.unsubscribe();
					}
				}
				_complete() {
					try {
						this.destination.complete();
					} finally {
						this.unsubscribe();
					}
				}
			}
			const m0 = Function.prototype.bind;
			function rl(e, t) {
				return m0.call(e, t);
			}
			class v0 {
				constructor(t) {
					this.partialObserver = t;
				}
				next(t) {
					const { partialObserver: n } = this;
					if (n.next)
						try {
							n.next(t);
						} catch (r) {
							ra(r);
						}
				}
				error(t) {
					const { partialObserver: n } = this;
					if (n.error)
						try {
							n.error(t);
						} catch (r) {
							ra(r);
						}
					else ra(t);
				}
				complete() {
					const { partialObserver: t } = this;
					if (t.complete)
						try {
							t.complete();
						} catch (n) {
							ra(n);
						}
				}
			}
			class ol extends nl {
				constructor(t, n, r) {
					let o;
					if ((super(), pe(t) || !t))
						o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
					else {
						let i;
						this && cr.useDeprecatedNextContext
							? ((i = Object.create(t)),
							  (i.unsubscribe = () => this.unsubscribe()),
							  (o = {
									next: t.next && rl(t.next, i),
									error: t.error && rl(t.error, i),
									complete: t.complete && rl(t.complete, i),
							  }))
							: (o = t);
					}
					this.destination = new v0(o);
				}
			}
			function ra(e) {
				cr.useDeprecatedSynchronousErrorHandling
					? (function g0(e) {
							cr.useDeprecatedSynchronousErrorHandling &&
								lr &&
								((lr.errorThrown = !0), (lr.error = e));
					  })(e)
					: mg(e);
			}
			function il(e, t) {
				const { onStoppedNotification: n } = cr;
				n && ta.setTimeout(() => n(e, t));
			}
			const D0 = {
					closed: !0,
					next: el,
					error: function y0(e) {
						throw e;
					},
					complete: el,
				},
				sl = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
			function dr(e) {
				return e;
			}
			function vg(e) {
				return 0 === e.length
					? dr
					: 1 === e.length
					? e[0]
					: function (n) {
							return e.reduce((r, o) => o(r), n);
					  };
			}
			let Se = (() => {
				class e {
					constructor(n) {
						n && (this._subscribe = n);
					}
					lift(n) {
						const r = new e();
						return (r.source = this), (r.operator = n), r;
					}
					subscribe(n, r, o) {
						const i = (function w0(e) {
							return (
								(e && e instanceof nl) ||
								((function C0(e) {
									return e && pe(e.next) && pe(e.error) && pe(e.complete);
								})(e) &&
									pg(e))
							);
						})(n)
							? n
							: new ol(n, r, o);
						return (
							na(() => {
								const { operator: s, source: a } = this;
								i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
							}),
							i
						);
					}
					_trySubscribe(n) {
						try {
							return this._subscribe(n);
						} catch (r) {
							n.error(r);
						}
					}
					forEach(n, r) {
						return new (r = yg(r))((o, i) => {
							const s = new ol({
								next: (a) => {
									try {
										n(a);
									} catch (u) {
										i(u), s.unsubscribe();
									}
								},
								error: i,
								complete: o,
							});
							this.subscribe(s);
						});
					}
					_subscribe(n) {
						var r;
						return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n);
					}
					[sl]() {
						return this;
					}
					pipe(...n) {
						return vg(n)(this);
					}
					toPromise(n) {
						return new (n = yg(n))((r, o) => {
							let i;
							this.subscribe(
								(s) => (i = s),
								(s) => o(s),
								() => r(i),
							);
						});
					}
				}
				return (e.create = (t) => new e(t)), e;
			})();
			function yg(e) {
				var t;
				return null !== (t = e ?? cr.Promise) && void 0 !== t ? t : Promise;
			}
			const E0 = Xc(
				(e) =>
					function () {
						e(this),
							(this.name = "ObjectUnsubscribedError"),
							(this.message = "object unsubscribed");
					},
			);
			let Ot = (() => {
				class e extends Se {
					constructor() {
						super(),
							(this.closed = !1),
							(this.currentObservers = null),
							(this.observers = []),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null);
					}
					lift(n) {
						const r = new Dg(this, this);
						return (r.operator = n), r;
					}
					_throwIfClosed() {
						if (this.closed) throw new E0();
					}
					next(n) {
						na(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.currentObservers || (this.currentObservers = Array.from(this.observers));
								for (const r of this.currentObservers) r.next(n);
							}
						});
					}
					error(n) {
						na(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								(this.hasError = this.isStopped = !0), (this.thrownError = n);
								const { observers: r } = this;
								for (; r.length; ) r.shift().error(n);
							}
						});
					}
					complete() {
						na(() => {
							if ((this._throwIfClosed(), !this.isStopped)) {
								this.isStopped = !0;
								const { observers: n } = this;
								for (; n.length; ) n.shift().complete();
							}
						});
					}
					unsubscribe() {
						(this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
					}
					get observed() {
						var n;
						return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0;
					}
					_trySubscribe(n) {
						return this._throwIfClosed(), super._trySubscribe(n);
					}
					_subscribe(n) {
						return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
					}
					_innerSubscribe(n) {
						const { hasError: r, isStopped: o, observers: i } = this;
						return r || o
							? hg
							: ((this.currentObservers = null),
							  i.push(n),
							  new at(() => {
									(this.currentObservers = null), Kc(i, n);
							  }));
					}
					_checkFinalizedStatuses(n) {
						const { hasError: r, thrownError: o, isStopped: i } = this;
						r ? n.error(o) : i && n.complete();
					}
					asObservable() {
						const n = new Se();
						return (n.source = this), n;
					}
				}
				return (e.create = (t, n) => new Dg(t, n)), e;
			})();
			class Dg extends Ot {
				constructor(t, n) {
					super(), (this.destination = t), (this.source = n);
				}
				next(t) {
					var n, r;
					null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) ||
						void 0 === r ||
						r.call(n, t);
				}
				error(t) {
					var n, r;
					null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) ||
						void 0 === r ||
						r.call(n, t);
				}
				complete() {
					var t, n;
					null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) ||
						void 0 === n ||
						n.call(t);
				}
				_subscribe(t) {
					var n, r;
					return null !==
						(r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) &&
						void 0 !== r
						? r
						: hg;
				}
			}
			class bt extends Ot {
				constructor(t) {
					super(), (this._value = t);
				}
				get value() {
					return this.getValue();
				}
				_subscribe(t) {
					const n = super._subscribe(t);
					return !n.closed && t.next(this._value), n;
				}
				getValue() {
					const { hasError: t, thrownError: n, _value: r } = this;
					if (t) throw n;
					return this._throwIfClosed(), r;
				}
				next(t) {
					super.next((this._value = t));
				}
			}
			function _g(e) {
				return pe(e?.lift);
			}
			function Ue(e) {
				return (t) => {
					if (_g(t))
						return t.lift(function (n) {
							try {
								return e(n, this);
							} catch (r) {
								this.error(r);
							}
						});
					throw new TypeError("Unable to lift unknown Observable type");
				};
			}
			function Re(e, t, n, r, o) {
				return new b0(e, t, n, r, o);
			}
			class b0 extends nl {
				constructor(t, n, r, o, i, s) {
					super(t),
						(this.onFinalize = i),
						(this.shouldUnsubscribe = s),
						(this._next = n
							? function (a) {
									try {
										n(a);
									} catch (u) {
										t.error(u);
									}
							  }
							: super._next),
						(this._error = o
							? function (a) {
									try {
										o(a);
									} catch (u) {
										t.error(u);
									} finally {
										this.unsubscribe();
									}
							  }
							: super._error),
						(this._complete = r
							? function () {
									try {
										r();
									} catch (a) {
										t.error(a);
									} finally {
										this.unsubscribe();
									}
							  }
							: super._complete);
				}
				unsubscribe() {
					var t;
					if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
						const { closed: n } = this;
						super.unsubscribe(),
							!n && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
					}
				}
			}
			function z(e, t) {
				return Ue((n, r) => {
					let o = 0;
					n.subscribe(
						Re(r, (i) => {
							r.next(e.call(t, i, o++));
						}),
					);
				});
			}
			const Cg = "https://g.co/ng/security#xss";
			class _ extends Error {
				constructor(t, n) {
					super(
						(function Ur(e, t) {
							return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
						})(t, n),
					),
						(this.code = t);
				}
			}
			function al(e) {
				return (t) => {
					setTimeout(e, void 0, t);
				};
			}
			const ge = class I0 extends Ot {
				constructor(t = !1) {
					super(), (this.__isAsync = t);
				}
				emit(t) {
					super.next(t);
				}
				subscribe(t, n, r) {
					let o = t,
						i = n || (() => null),
						s = r;
					if (t && "object" == typeof t) {
						const u = t;
						(o = u.next?.bind(u)), (i = u.error?.bind(u)), (s = u.complete?.bind(u));
					}
					this.__isAsync && ((i = al(i)), o && (o = al(o)), s && (s = al(s)));
					const a = super.subscribe({ next: o, error: i, complete: s });
					return t instanceof at && t.add(a), a;
				}
			};
			var $ = (function (e) {
				return (
					(e[(e.Default = 0)] = "Default"),
					(e[(e.Host = 1)] = "Host"),
					(e[(e.Self = 2)] = "Self"),
					(e[(e.SkipSelf = 4)] = "SkipSelf"),
					(e[(e.Optional = 8)] = "Optional"),
					e
				);
			})($ || {});
			function xe(e) {
				if ("string" == typeof e) return e;
				if (Array.isArray(e)) return "[" + e.map(xe).join(", ") + "]";
				if (null == e) return "" + e;
				if (e.overriddenName) return `${e.overriddenName}`;
				if (e.name) return `${e.name}`;
				const t = e.toString();
				if (null == t) return "" + t;
				const n = t.indexOf("\n");
				return -1 === n ? t : t.substring(0, n);
			}
			function ul(e, t) {
				return null == e || "" === e
					? null === t
						? ""
						: t
					: null == t || "" === t
					? e
					: e + " " + t;
			}
			var ia = (function (e) {
					return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
				})(ia || {}),
				Pt = (function (e) {
					return (
						(e[(e.Emulated = 0)] = "Emulated"),
						(e[(e.None = 2)] = "None"),
						(e[(e.ShadowDom = 3)] = "ShadowDom"),
						e
					);
				})(Pt || {});
			function mn(e) {
				return { toString: e }.toString();
			}
			const K = globalThis,
				Qt = {},
				W = [];
			function ee(e) {
				for (let t in e) if (e[t] === ee) return t;
				throw Error("Could not find renamed property on target object.");
			}
			const Di = ee({ ɵcmp: ee }),
				cl = ee({ ɵdir: ee }),
				ll = ee({ ɵpipe: ee }),
				bg = ee({ ɵmod: ee }),
				vn = ee({ ɵfac: ee }),
				_i = ee({ __NG_ELEMENT_ID__: ee }),
				Ig = ee({ __NG_ENV_ID__: ee });
			var me = (function (e) {
				return (
					(e[(e.None = 0)] = "None"),
					(e[(e.SignalBased = 1)] = "SignalBased"),
					(e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
					e
				);
			})(me || {});
			function Mg(e, t, n) {
				let r = e.length;
				for (;;) {
					const o = e.indexOf(t, n);
					if (-1 === o) return o;
					if (0 === o || e.charCodeAt(o - 1) <= 32) {
						const i = t.length;
						if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
					}
					n = o + 1;
				}
			}
			function dl(e, t, n) {
				let r = 0;
				for (; r < n.length; ) {
					const o = n[r];
					if ("number" == typeof o) {
						if (0 !== o) break;
						r++;
						const i = n[r++],
							s = n[r++],
							a = n[r++];
						e.setAttribute(t, s, a, i);
					} else {
						const i = o,
							s = n[++r];
						Tg(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
					}
				}
				return r;
			}
			function Sg(e) {
				return 3 === e || 4 === e || 6 === e;
			}
			function Tg(e) {
				return 64 === e.charCodeAt(0);
			}
			function Ci(e, t) {
				if (null !== t && 0 !== t.length)
					if (null === e || 0 === e.length) e = t.slice();
					else {
						let n = -1;
						for (let r = 0; r < t.length; r++) {
							const o = t[r];
							"number" == typeof o
								? (n = o)
								: 0 === n || Ag(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
						}
					}
				return e;
			}
			function Ag(e, t, n, r, o) {
				let i = 0,
					s = e.length;
				if (-1 === t) s = -1;
				else
					for (; i < e.length; ) {
						const a = e[i++];
						if ("number" == typeof a) {
							if (a === t) {
								s = -1;
								break;
							}
							if (a > t) {
								s = i - 1;
								break;
							}
						}
					}
				for (; i < e.length; ) {
					const a = e[i];
					if ("number" == typeof a) break;
					if (a === n) {
						if (null === r) return void (null !== o && (e[i + 1] = o));
						if (r === e[i + 1]) return void (e[i + 2] = o);
					}
					i++, null !== r && i++, null !== o && i++;
				}
				-1 !== s && (e.splice(s, 0, t), (i = s + 1)),
					e.splice(i++, 0, n),
					null !== r && e.splice(i++, 0, r),
					null !== o && e.splice(i++, 0, o);
			}
			const Ng = "ng-template";
			function N0(e, t, n) {
				let r = 0,
					o = !0;
				for (; r < e.length; ) {
					let i = e[r++];
					if ("string" == typeof i && o) {
						const s = e[r++];
						if (n && "class" === i && -1 !== Mg(s.toLowerCase(), t, 0)) return !0;
					} else {
						if (1 === i) {
							for (; r < e.length && "string" == typeof (i = e[r++]); )
								if (i.toLowerCase() === t) return !0;
							return !1;
						}
						"number" == typeof i && (o = !1);
					}
				}
				return !1;
			}
			function Rg(e) {
				return 4 === e.type && e.value !== Ng;
			}
			function R0(e, t, n) {
				return t === (4 !== e.type || n ? e.value : Ng);
			}
			function x0(e, t, n) {
				let r = 4;
				const o = e.attrs || [],
					i = (function F0(e) {
						for (let t = 0; t < e.length; t++) if (Sg(e[t])) return t;
						return e.length;
					})(o);
				let s = !1;
				for (let a = 0; a < t.length; a++) {
					const u = t[a];
					if ("number" != typeof u) {
						if (!s)
							if (4 & r) {
								if (
									((r = 2 | (1 & r)), ("" !== u && !R0(e, u, n)) || ("" === u && 1 === t.length))
								) {
									if (Ft(r)) return !1;
									s = !0;
								}
							} else {
								const c = 8 & r ? u : t[++a];
								if (8 & r && null !== e.attrs) {
									if (!N0(e.attrs, c, n)) {
										if (Ft(r)) return !1;
										s = !0;
									}
									continue;
								}
								const d = O0(8 & r ? "class" : u, o, Rg(e), n);
								if (-1 === d) {
									if (Ft(r)) return !1;
									s = !0;
									continue;
								}
								if ("" !== c) {
									let f;
									f = d > i ? "" : o[d + 1].toLowerCase();
									const h = 8 & r ? f : null;
									if ((h && -1 !== Mg(h, c, 0)) || (2 & r && c !== f)) {
										if (Ft(r)) return !1;
										s = !0;
									}
								}
							}
					} else {
						if (!s && !Ft(r) && !Ft(u)) return !1;
						if (s && Ft(u)) continue;
						(s = !1), (r = u | (1 & r));
					}
				}
				return Ft(r) || s;
			}
			function Ft(e) {
				return 0 == (1 & e);
			}
			function O0(e, t, n, r) {
				if (null === t) return -1;
				let o = 0;
				if (r || !n) {
					let i = !1;
					for (; o < t.length; ) {
						const s = t[o];
						if (s === e) return o;
						if (3 === s || 6 === s) i = !0;
						else {
							if (1 === s || 2 === s) {
								let a = t[++o];
								for (; "string" == typeof a; ) a = t[++o];
								continue;
							}
							if (4 === s) break;
							if (0 === s) {
								o += 4;
								continue;
							}
						}
						o += i ? 1 : 2;
					}
					return -1;
				}
				return (function k0(e, t) {
					let n = e.indexOf(4);
					if (n > -1)
						for (n++; n < e.length; ) {
							const r = e[n];
							if ("number" == typeof r) return -1;
							if (r === t) return n;
							n++;
						}
					return -1;
				})(t, e);
			}
			function xg(e, t, n = !1) {
				for (let r = 0; r < t.length; r++) if (x0(e, t[r], n)) return !0;
				return !1;
			}
			function L0(e, t) {
				e: for (let n = 0; n < t.length; n++) {
					const r = t[n];
					if (e.length === r.length) {
						for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
						return !0;
					}
				}
				return !1;
			}
			function Og(e, t) {
				return e ? ":not(" + t.trim() + ")" : t;
			}
			function V0(e) {
				let t = e[0],
					n = 1,
					r = 2,
					o = "",
					i = !1;
				for (; n < e.length; ) {
					let s = e[n];
					if ("string" == typeof s)
						if (2 & r) {
							const a = e[++n];
							o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
						} else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
					else "" !== o && !Ft(s) && ((t += Og(i, o)), (o = "")), (r = s), (i = i || !Ft(r));
					n++;
				}
				return "" !== o && (t += Og(i, o)), t;
			}
			function yn(e) {
				return mn(() => {
					const t = Fg(e),
						n = {
							...t,
							decls: e.decls,
							vars: e.vars,
							template: e.template,
							consts: e.consts || null,
							ngContentSelectors: e.ngContentSelectors,
							onPush: e.changeDetection === ia.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							dependencies: (t.standalone && e.dependencies) || null,
							getStandaloneInjector: null,
							signals: e.signals ?? !1,
							data: e.data || {},
							encapsulation: e.encapsulation || Pt.Emulated,
							styles: e.styles || W,
							_: null,
							schemas: e.schemas || null,
							tView: null,
							id: "",
						};
					kg(n);
					const r = e.dependencies;
					return (
						(n.directiveDefs = sa(r, !1)),
						(n.pipeDefs = sa(r, !0)),
						(n.id = (function z0(e) {
							let t = 0;
							const n = [
								e.selectors,
								e.ngContentSelectors,
								e.hostVars,
								e.hostAttrs,
								e.consts,
								e.vars,
								e.decls,
								e.encapsulation,
								e.standalone,
								e.signals,
								e.exportAs,
								JSON.stringify(e.inputs),
								JSON.stringify(e.outputs),
								Object.getOwnPropertyNames(e.type.prototype),
								!!e.contentQueries,
								!!e.viewQuery,
							].join("|");
							for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
							return (t += 2147483648), "c" + t;
						})(n)),
						n
					);
				});
			}
			function U0(e) {
				return U(e) || Oe(e);
			}
			function $0(e) {
				return null !== e;
			}
			function Yt(e) {
				return mn(() => ({
					type: e.type,
					bootstrap: e.bootstrap || W,
					declarations: e.declarations || W,
					imports: e.imports || W,
					exports: e.exports || W,
					transitiveCompileScopes: null,
					schemas: e.schemas || null,
					id: e.id || null,
				}));
			}
			function Pg(e, t) {
				if (null == e) return Qt;
				const n = {};
				for (const r in e)
					if (e.hasOwnProperty(r)) {
						const o = e[r];
						let i,
							s,
							a = me.None;
						Array.isArray(o) ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i)) : ((i = o), (s = o)),
							t ? ((n[i] = a !== me.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
					}
				return n;
			}
			function P(e) {
				return mn(() => {
					const t = Fg(e);
					return kg(t), t;
				});
			}
			function ze(e) {
				return {
					type: e.type,
					name: e.name,
					factory: null,
					pure: !1 !== e.pure,
					standalone: !0 === e.standalone,
					onDestroy: e.type.prototype.ngOnDestroy || null,
				};
			}
			function U(e) {
				return e[Di] || null;
			}
			function Oe(e) {
				return e[cl] || null;
			}
			function $e(e) {
				return e[ll] || null;
			}
			function Ge(e, t) {
				const n = e[bg] || null;
				if (!n && !0 === t) throw new Error(`Type ${xe(e)} does not have '\u0275mod' property.`);
				return n;
			}
			function Fg(e) {
				const t = {};
				return {
					type: e.type,
					providersResolver: null,
					factory: null,
					hostBindings: e.hostBindings || null,
					hostVars: e.hostVars || 0,
					hostAttrs: e.hostAttrs || null,
					contentQueries: e.contentQueries || null,
					declaredInputs: t,
					inputTransforms: null,
					inputConfig: e.inputs || Qt,
					exportAs: e.exportAs || null,
					standalone: !0 === e.standalone,
					signals: !0 === e.signals,
					selectors: e.selectors || W,
					viewQuery: e.viewQuery || null,
					features: e.features || null,
					setInput: null,
					findHostDirectiveDefs: null,
					hostDirectives: null,
					inputs: Pg(e.inputs, t),
					outputs: Pg(e.outputs),
					debugInfo: null,
				};
			}
			function kg(e) {
				e.features?.forEach((t) => t(e));
			}
			function sa(e, t) {
				if (!e) return null;
				const n = t ? $e : U0;
				return () => ("function" == typeof e ? e() : e).map((r) => n(r)).filter($0);
			}
			const ve = 0,
				E = 1,
				T = 2,
				we = 3,
				kt = 4,
				qe = 5,
				Lt = 6,
				$r = 7,
				ue = 8,
				We = 9,
				Dn = 10,
				k = 11,
				wi = 12,
				Lg = 13,
				Hr = 14,
				De = 15,
				Ei = 16,
				zr = 17,
				_n = 18,
				bi = 19,
				Vg = 20,
				Vn = 21,
				aa = 22,
				fr = 23,
				L = 25,
				fl = 1,
				Xt = 7,
				Gr = 9,
				Ee = 10;
			var hl = (function (e) {
				return (
					(e[(e.None = 0)] = "None"), (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"), e
				);
			})(hl || {});
			function Ze(e) {
				return Array.isArray(e) && "object" == typeof e[fl];
			}
			function Qe(e) {
				return Array.isArray(e) && !0 === e[fl];
			}
			function pl(e) {
				return 0 != (4 & e.flags);
			}
			function hr(e) {
				return e.componentOffset > -1;
			}
			function ca(e) {
				return 1 == (1 & e.flags);
			}
			function Vt(e) {
				return !!e.template;
			}
			function gl(e) {
				return 0 != (512 & e[T]);
			}
			let zg = !1;
			function oe(e) {
				for (; Array.isArray(e); ) e = e[ve];
				return e;
			}
			function tt(e, t) {
				return oe(t[e.index]);
			}
			function Si(e, t) {
				return e.data[t];
			}
			function qr(e, t) {
				return e[t];
			}
			function vt(e, t) {
				const n = t[e];
				return Ze(n) ? n : n[ve];
			}
			function Dl(e) {
				return 128 == (128 & e[T]);
			}
			function Jt(e, t) {
				return null == t ? null : e[t];
			}
			function Gg(e) {
				e[zr] = 0;
			}
			function J0(e) {
				1024 & e[T] || ((e[T] |= 1024), Dl(e) && Ti(e));
			}
			function _l(e) {
				return !!(9216 & e[T] || e[fr]?.dirty);
			}
			function Cl(e) {
				_l(e)
					? Ti(e)
					: 64 & e[T] &&
					  ((function Z0() {
							return zg;
					  })()
							? ((e[T] |= 1024), Ti(e))
							: e[Dn].changeDetectionScheduler?.notify());
			}
			function Ti(e) {
				e[Dn].changeDetectionScheduler?.notify();
				let t = pr(e);
				for (; null !== t && !(8192 & t[T]) && ((t[T] |= 8192), Dl(t)); ) t = pr(t);
			}
			function la(e, t) {
				if (256 == (256 & e[T])) throw new _(911, !1);
				null === e[Vn] && (e[Vn] = []), e[Vn].push(t);
			}
			function pr(e) {
				const t = e[we];
				return Qe(t) ? t[we] : t;
			}
			const x = { lFrame: tm(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
			function Zg() {
				return x.bindingsEnabled;
			}
			function Wr() {
				return null !== x.skipHydrationRootTNode;
			}
			function y() {
				return x.lFrame.lView;
			}
			function H() {
				return x.lFrame.tView;
			}
			function Zr(e) {
				return (x.lFrame.contextLView = e), e[ue];
			}
			function Qr(e) {
				return (x.lFrame.contextLView = null), e;
			}
			function te() {
				let e = Qg();
				for (; null !== e && 64 === e.type; ) e = e.parent;
				return e;
			}
			function Qg() {
				return x.lFrame.currentTNode;
			}
			function Kt(e, t) {
				const n = x.lFrame;
				(n.currentTNode = e), (n.isParent = t);
			}
			function El() {
				return x.lFrame.isParent;
			}
			function bl() {
				x.lFrame.isParent = !1;
			}
			function nt() {
				const e = x.lFrame;
				let t = e.bindingRootIndex;
				return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
			}
			function jt() {
				return x.lFrame.bindingIndex++;
			}
			function cS(e, t) {
				const n = x.lFrame;
				(n.bindingIndex = n.bindingRootIndex = e), Il(t);
			}
			function Il(e) {
				x.lFrame.currentDirectiveIndex = e;
			}
			function da(e) {
				x.lFrame.currentQueryIndex = e;
			}
			function dS(e) {
				const t = e[E];
				return 2 === t.type ? t.declTNode : 1 === t.type ? e[qe] : null;
			}
			function Kg(e, t, n) {
				if (n & $.SkipSelf) {
					let o = t,
						i = e;
					for (
						;
						!((o = o.parent),
						null !== o || n & $.Host || ((o = dS(i)), null === o || ((i = i[Hr]), 10 & o.type)));

					);
					if (null === o) return !1;
					(t = o), (e = i);
				}
				const r = (x.lFrame = em());
				return (r.currentTNode = t), (r.lView = e), !0;
			}
			function Tl(e) {
				const t = em(),
					n = e[E];
				(x.lFrame = t),
					(t.currentTNode = n.firstChild),
					(t.lView = e),
					(t.tView = n),
					(t.contextLView = e),
					(t.bindingIndex = n.bindingStartIndex),
					(t.inI18n = !1);
			}
			function em() {
				const e = x.lFrame,
					t = null === e ? null : e.child;
				return null === t ? tm(e) : t;
			}
			function tm(e) {
				const t = {
					currentTNode: null,
					isParent: !0,
					lView: null,
					tView: null,
					selectedIndex: -1,
					contextLView: null,
					elementDepthCount: 0,
					currentNamespace: null,
					currentDirectiveIndex: -1,
					bindingRootIndex: -1,
					bindingIndex: -1,
					currentQueryIndex: 0,
					parent: e,
					child: null,
					inI18n: !1,
				};
				return null !== e && (e.child = t), t;
			}
			function nm() {
				const e = x.lFrame;
				return (x.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
			}
			const rm = nm;
			function Al() {
				const e = nm();
				(e.isParent = !0),
					(e.tView = null),
					(e.selectedIndex = -1),
					(e.contextLView = null),
					(e.elementDepthCount = 0),
					(e.currentDirectiveIndex = -1),
					(e.currentNamespace = null),
					(e.bindingRootIndex = -1),
					(e.bindingIndex = -1),
					(e.currentQueryIndex = 0);
			}
			function Ye() {
				return x.lFrame.selectedIndex;
			}
			function gr(e) {
				x.lFrame.selectedIndex = e;
			}
			function ce() {
				const e = x.lFrame;
				return Si(e.tView, e.selectedIndex);
			}
			let im = !0;
			function fa() {
				return im;
			}
			function jn(e) {
				im = e;
			}
			function vS() {
				return Yr(te(), y());
			}
			function Yr(e, t) {
				return new yt(tt(e, t));
			}
			let Ol,
				yt = (() => {
					class e {
						constructor(n) {
							this.nativeElement = n;
						}
						static #e = (this.__NG_ELEMENT_ID__ = vS);
					}
					return e;
				})();
			function Xr(e, t) {
				e.forEach((n) => (Array.isArray(n) ? Xr(n, t) : t(n)));
			}
			function am(e, t, n) {
				t >= e.length ? e.push(n) : e.splice(t, 0, n);
			}
			function ha(e, t) {
				return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
			}
			function ga(e) {
				return 128 == (128 & e.flags);
			}
			function M(e) {
				return {
					token: e.token,
					providedIn: e.providedIn || null,
					factory: e.factory,
					value: void 0,
				};
			}
			function Bt(e) {
				return { providers: e.providers || [], imports: e.imports || [] };
			}
			function va(e) {
				return fm(e, Da) || fm(e, hm);
			}
			function fm(e, t) {
				return e.hasOwnProperty(t) ? e[t] : null;
			}
			function ya(e) {
				return e && (e.hasOwnProperty(Pl) || e.hasOwnProperty(bS)) ? e[Pl] : null;
			}
			Symbol;
			const Da = ee({ ɵprov: ee }),
				Pl = ee({ ɵinj: ee }),
				hm = ee({ ngInjectableDef: ee }),
				bS = ee({ ngInjectorDef: ee });
			class b {
				constructor(t, n) {
					(this._desc = t),
						(this.ngMetadataName = "InjectionToken"),
						(this.ɵprov = void 0),
						"number" == typeof n
							? (this.__NG_ELEMENT_ID__ = n)
							: void 0 !== n &&
							  (this.ɵprov = M({
									token: this,
									providedIn: n.providedIn || "root",
									factory: n.factory,
							  }));
				}
				get multi() {
					return this;
				}
				toString() {
					return `InjectionToken ${this._desc}`;
				}
			}
			const _a = new b("", { providedIn: "root", factory: () => IS }),
				IS = "ng",
				pm = new b(""),
				Un = new b("", { providedIn: "platform", factory: () => "unknown" }),
				gm = new b("", {
					providedIn: "root",
					factory: () =>
						(function Bn() {
							if (void 0 !== Ol) return Ol;
							if (typeof document < "u") return document;
							throw new _(210, !1);
						})()
							.body?.querySelector("[ngCspNonce]")
							?.getAttribute("ngCspNonce") || null,
				}),
				TS = ee({ __forward_ref__: ee });
			function le(e) {
				return (
					(e.__forward_ref__ = le),
					(e.toString = function () {
						return xe(this());
					}),
					e
				);
			}
			function R(e) {
				return Ca(e) ? e() : e;
			}
			function Ca(e) {
				return "function" == typeof e && e.hasOwnProperty(TS) && e.__forward_ref__ === le;
			}
			function jl(e) {
				return e && !!e.ɵproviders;
			}
			function V(e) {
				return "string" == typeof e ? e : null == e ? "" : String(e);
			}
			function Bl(e, t) {
				throw new _(-201, !1);
			}
			let Ul;
			function vm() {
				return Ul;
			}
			function ct(e) {
				const t = Ul;
				return (Ul = e), t;
			}
			function ym(e, t, n) {
				const r = va(e);
				return r && "root" == r.providedIn
					? void 0 === r.value
						? (r.value = r.factory())
						: r.value
					: n & $.Optional
					? null
					: void 0 !== t
					? t
					: void Bl();
			}
			const Ri = {},
				$l = "__NG_DI_FLAG__",
				wa = "ngTempTokenPath",
				PS = /\n/gm,
				Dm = "__source";
			let Kr;
			function $n(e) {
				const t = Kr;
				return (Kr = e), t;
			}
			function LS(e, t = $.Default) {
				if (void 0 === Kr) throw new _(-203, !1);
				return null === Kr ? ym(e, void 0, t) : Kr.get(e, t & $.Optional ? null : void 0, t);
			}
			function S(e, t = $.Default) {
				return (vm() || LS)(R(e), t);
			}
			function w(e, t = $.Default) {
				return S(e, Ea(t));
			}
			function Ea(e) {
				return typeof e > "u" || "number" == typeof e
					? e
					: 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
			}
			function Hl(e) {
				const t = [];
				for (let n = 0; n < e.length; n++) {
					const r = R(e[n]);
					if (Array.isArray(r)) {
						if (0 === r.length) throw new _(900, !1);
						let o,
							i = $.Default;
						for (let s = 0; s < r.length; s++) {
							const a = r[s],
								u = VS(a);
							"number" == typeof u ? (-1 === u ? (o = a.token) : (i |= u)) : (o = a);
						}
						t.push(S(o, i));
					} else t.push(S(r));
				}
				return t;
			}
			function xi(e, t) {
				return (e[$l] = t), (e.prototype[$l] = t), e;
			}
			function VS(e) {
				return e[$l];
			}
			let Cm = () => null;
			function Xl(e, t, n = !1) {
				return Cm(e, t, n);
			}
			const oo = "__parameters__";
			function so(e, t, n) {
				return mn(() => {
					const r = (function td(e) {
						return function (...n) {
							if (e) {
								const r = e(...n);
								for (const o in r) this[o] = r[o];
							}
						};
					})(t);
					function o(...i) {
						if (this instanceof o) return r.apply(this, i), this;
						const s = new o(...i);
						return (a.annotation = s), a;
						function a(u, c, l) {
							const d = u.hasOwnProperty(oo)
								? u[oo]
								: Object.defineProperty(u, oo, { value: [] })[oo];
							for (; d.length <= l; ) d.push(null);
							return (d[l] = d[l] || []).push(s), u;
						}
					}
					return (
						n && (o.prototype = Object.create(n.prototype)),
						(o.prototype.ngMetadataName = e),
						(o.annotationCls = o),
						o
					);
				});
			}
			const Aa = xi(so("Optional"), 8),
				Na = xi(so("SkipSelf"), 4);
			function mr(e, t) {
				return e.hasOwnProperty(vn) ? e[vn] : null;
			}
			const vr = new b(""),
				Sm = new b("", -1),
				nd = new b("");
			class Ra {
				get(t, n = Ri) {
					if (n === Ri) {
						const r = new Error(`NullInjectorError: No provider for ${xe(t)}!`);
						throw ((r.name = "NullInjectorError"), r);
					}
					return n;
				}
			}
			function JS(...e) {
				return { ɵproviders: Tm(0, e), ɵfromNgModule: !0 };
			}
			function Tm(e, ...t) {
				const n = [],
					r = new Set();
				let o;
				const i = (s) => {
					n.push(s);
				};
				return (
					Xr(t, (s) => {
						const a = s;
						Oa(a, i, [], r) && ((o ||= []), o.push(a));
					}),
					void 0 !== o && Am(o, i),
					n
				);
			}
			function Am(e, t) {
				for (let n = 0; n < e.length; n++) {
					const { ngModule: r, providers: o } = e[n];
					rd(o, (i) => {
						t(i, r);
					});
				}
			}
			function Oa(e, t, n, r) {
				if (!(e = R(e))) return !1;
				let o = null,
					i = ya(e);
				const s = !i && U(e);
				if (i || s) {
					if (s && !s.standalone) return !1;
					o = e;
				} else {
					const u = e.ngModule;
					if (((i = ya(u)), !i)) return !1;
					o = u;
				}
				const a = r.has(o);
				if (s) {
					if (a) return !1;
					if ((r.add(o), s.dependencies)) {
						const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
						for (const c of u) Oa(c, t, n, r);
					}
				} else {
					if (!i) return !1;
					{
						if (null != i.imports && !a) {
							let c;
							r.add(o);
							try {
								Xr(i.imports, (l) => {
									Oa(l, t, n, r) && ((c ||= []), c.push(l));
								});
							} finally {
							}
							void 0 !== c && Am(c, t);
						}
						if (!a) {
							const c = mr(o) || (() => new o());
							t({ provide: o, useFactory: c, deps: W }, o),
								t({ provide: nd, useValue: o, multi: !0 }, o),
								t({ provide: vr, useValue: () => S(o), multi: !0 }, o);
						}
						const u = i.providers;
						if (null != u && !a) {
							const c = e;
							rd(u, (l) => {
								t(l, c);
							});
						}
					}
				}
				return o !== e && void 0 !== e.providers;
			}
			function rd(e, t) {
				for (let n of e) jl(n) && (n = n.ɵproviders), Array.isArray(n) ? rd(n, t) : t(n);
			}
			const KS = ee({ provide: String, useValue: ee });
			function od(e) {
				return null !== e && "object" == typeof e && KS in e;
			}
			function yr(e) {
				return "function" == typeof e;
			}
			const id = new b(""),
				Pa = {},
				tT = {};
			let sd;
			function Fa() {
				return void 0 === sd && (sd = new Ra()), sd;
			}
			class _t {}
			class ao extends _t {
				get destroyed() {
					return this._destroyed;
				}
				constructor(t, n, r, o) {
					super(),
						(this.parent = n),
						(this.source = r),
						(this.scopes = o),
						(this.records = new Map()),
						(this._ngOnDestroyHooks = new Set()),
						(this._onDestroyHooks = []),
						(this._destroyed = !1),
						ud(t, (s) => this.processProvider(s)),
						this.records.set(Sm, uo(void 0, this)),
						o.has("environment") && this.records.set(_t, uo(void 0, this));
					const i = this.records.get(id);
					null != i && "string" == typeof i.value && this.scopes.add(i.value),
						(this.injectorDefTypes = new Set(this.get(nd, W, $.Self)));
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
						const t = this._onDestroyHooks;
						this._onDestroyHooks = [];
						for (const n of t) n();
					} finally {
						this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
					}
				}
				onDestroy(t) {
					return (
						this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
					);
				}
				runInContext(t) {
					this.assertNotDestroyed();
					const n = $n(this),
						r = ct(void 0);
					try {
						return t();
					} finally {
						$n(n), ct(r);
					}
				}
				get(t, n = Ri, r = $.Default) {
					if ((this.assertNotDestroyed(), t.hasOwnProperty(Ig))) return t[Ig](this);
					r = Ea(r);
					const i = $n(this),
						s = ct(void 0);
					try {
						if (!(r & $.SkipSelf)) {
							let u = this.records.get(t);
							if (void 0 === u) {
								const c =
									(function sT(e) {
										return "function" == typeof e || ("object" == typeof e && e instanceof b);
									})(t) && va(t);
								(u = c && this.injectableDefInScope(c) ? uo(ad(t), Pa) : null),
									this.records.set(t, u);
							}
							if (null != u) return this.hydrate(t, u);
						}
						return (r & $.Self ? Fa() : this.parent).get(
							t,
							(n = r & $.Optional && n === Ri ? null : n),
						);
					} catch (a) {
						if ("NullInjectorError" === a.name) {
							if (((a[wa] = a[wa] || []).unshift(xe(t)), i)) throw a;
							return (function jS(e, t, n, r) {
								const o = e[wa];
								throw (
									(t[Dm] && o.unshift(t[Dm]),
									(e.message = (function BS(e, t, n, r = null) {
										e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
										let o = xe(t);
										if (Array.isArray(t)) o = t.map(xe).join(" -> ");
										else if ("object" == typeof t) {
											let i = [];
											for (let s in t)
												if (t.hasOwnProperty(s)) {
													let a = t[s];
													i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : xe(a)));
												}
											o = `{${i.join(", ")}}`;
										}
										return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(PS, "\n  ")}`;
									})("\n" + e.message, o, n, r)),
									(e.ngTokenPath = o),
									(e[wa] = null),
									e)
								);
							})(a, t, "R3InjectorError", this.source);
						}
						throw a;
					} finally {
						ct(s), $n(i);
					}
				}
				resolveInjectorInitializers() {
					const t = $n(this),
						n = ct(void 0);
					try {
						const o = this.get(vr, W, $.Self);
						for (const i of o) i();
					} finally {
						$n(t), ct(n);
					}
				}
				toString() {
					const t = [],
						n = this.records;
					for (const r of n.keys()) t.push(xe(r));
					return `R3Injector[${t.join(", ")}]`;
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new _(205, !1);
				}
				processProvider(t) {
					let n = yr((t = R(t))) ? t : R(t && t.provide);
					const r = (function rT(e) {
						return od(e)
							? uo(void 0, e.useValue)
							: uo(
									(function xm(e, t, n) {
										let r;
										if (yr(e)) {
											const o = R(e);
											return mr(o) || ad(o);
										}
										if (od(e)) r = () => R(e.useValue);
										else if (
											(function Rm(e) {
												return !(!e || !e.useFactory);
											})(e)
										)
											r = () => e.useFactory(...Hl(e.deps || []));
										else if (
											(function Nm(e) {
												return !(!e || !e.useExisting);
											})(e)
										)
											r = () => S(R(e.useExisting));
										else {
											const o = R(e && (e.useClass || e.provide));
											if (
												!(function oT(e) {
													return !!e.deps;
												})(e)
											)
												return mr(o) || ad(o);
											r = () => new o(...Hl(e.deps));
										}
										return r;
									})(e),
									Pa,
							  );
					})(t);
					if (!yr(t) && !0 === t.multi) {
						let o = this.records.get(n);
						o ||
							((o = uo(void 0, Pa, !0)), (o.factory = () => Hl(o.multi)), this.records.set(n, o)),
							(n = t),
							o.multi.push(t);
					}
					this.records.set(n, r);
				}
				hydrate(t, n) {
					return (
						n.value === Pa && ((n.value = tT), (n.value = n.factory())),
						"object" == typeof n.value &&
							n.value &&
							(function iT(e) {
								return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy;
							})(n.value) &&
							this._ngOnDestroyHooks.add(n.value),
						n.value
					);
				}
				injectableDefInScope(t) {
					if (!t.providedIn) return !1;
					const n = R(t.providedIn);
					return "string" == typeof n
						? "any" === n || this.scopes.has(n)
						: this.injectorDefTypes.has(n);
				}
				removeOnDestroy(t) {
					const n = this._onDestroyHooks.indexOf(t);
					-1 !== n && this._onDestroyHooks.splice(n, 1);
				}
			}
			function ad(e) {
				const t = va(e),
					n = null !== t ? t.factory : mr(e);
				if (null !== n) return n;
				if (e instanceof b) throw new _(204, !1);
				if (e instanceof Function)
					return (function nT(e) {
						if (e.length > 0) throw new _(204, !1);
						const n = (function ES(e) {
							return (e && (e[Da] || e[hm])) || null;
						})(e);
						return null !== n ? () => n.factory(e) : () => new e();
					})(e);
				throw new _(204, !1);
			}
			function uo(e, t, n = !1) {
				return { factory: e, value: t, multi: n ? [] : void 0 };
			}
			function ud(e, t) {
				for (const n of e) Array.isArray(n) ? ud(n, t) : n && jl(n) ? ud(n.ɵproviders, t) : t(n);
			}
			function Hn(e, t) {
				e instanceof ao && e.assertNotDestroyed();
				const r = $n(e),
					o = ct(void 0);
				try {
					return t();
				} finally {
					$n(r), ct(o);
				}
			}
			class mT {
				constructor(t, n, r) {
					(this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
				}
				isFirstChange() {
					return this.firstChange;
				}
			}
			function Pm(e, t, n, r) {
				null !== t ? t.applyValueToInputSignal(t, r) : (e[n] = r);
			}
			function It() {
				return Fm;
			}
			function Fm(e) {
				return e.type.prototype.ngOnChanges && (e.setInput = yT), vT;
			}
			function vT() {
				const e = Lm(this),
					t = e?.current;
				if (t) {
					const n = e.previous;
					if (n === Qt) e.previous = t;
					else for (let r in t) n[r] = t[r];
					(e.current = null), this.ngOnChanges(t);
				}
			}
			function yT(e, t, n, r, o) {
				const i = this.declaredInputs[r],
					s =
						Lm(e) ||
						(function DT(e, t) {
							return (e[km] = t);
						})(e, { previous: Qt, current: null }),
					a = s.current || (s.current = {}),
					u = s.previous,
					c = u[i];
				(a[i] = new mT(c && c.currentValue, n, u === Qt)), Pm(e, t, o, n);
			}
			It.ngInherit = !0;
			const km = "__ngSimpleChanges__";
			function Lm(e) {
				return e[km] || null;
			}
			const en = function (e, t, n) {};
			function La(e, t) {
				for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
					const i = e.data[n].type.prototype,
						{
							ngAfterContentInit: s,
							ngAfterContentChecked: a,
							ngAfterViewInit: u,
							ngAfterViewChecked: c,
							ngOnDestroy: l,
						} = i;
					s && (e.contentHooks ??= []).push(-n, s),
						a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)),
						u && (e.viewHooks ??= []).push(-n, u),
						c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)),
						null != l && (e.destroyHooks ??= []).push(n, l);
				}
			}
			function Va(e, t, n) {
				Vm(e, t, 3, n);
			}
			function ja(e, t, n, r) {
				(3 & e[T]) === n && Vm(e, t, n, r);
			}
			function fd(e, t) {
				let n = e[T];
				(3 & n) === t && ((n &= 16383), (n += 1), (e[T] = n));
			}
			function Vm(e, t, n, r) {
				const i = r ?? -1,
					s = t.length - 1;
				let a = 0;
				for (let u = void 0 !== r ? 65535 & e[zr] : 0; u < s; u++)
					if ("number" == typeof t[u + 1]) {
						if (((a = t[u]), null != r && a >= r)) break;
					} else
						t[u] < 0 && (e[zr] += 65536),
							(a < i || -1 == i) && (wT(e, n, t, u), (e[zr] = (4294901760 & e[zr]) + u + 2)),
							u++;
			}
			function jm(e, t) {
				en(4, e, t);
				const n = _e(null);
				try {
					t.call(e);
				} finally {
					_e(n), en(5, e, t);
				}
			}
			function wT(e, t, n, r) {
				const o = n[r] < 0,
					i = n[r + 1],
					a = e[o ? -n[r] : n[r]];
				o ? e[T] >> 14 < e[zr] >> 16 && (3 & e[T]) === t && ((e[T] += 16384), jm(a, i)) : jm(a, i);
			}
			const lo = -1;
			class Li {
				constructor(t, n, r) {
					(this.factory = t),
						(this.resolving = !1),
						(this.canSeeViewProviders = n),
						(this.injectImpl = r);
				}
			}
			function pd(e) {
				return e !== lo;
			}
			function Vi(e) {
				return 32767 & e;
			}
			function ji(e, t) {
				let n = (function ST(e) {
						return e >> 16;
					})(e),
					r = t;
				for (; n > 0; ) (r = r[Hr]), n--;
				return r;
			}
			let gd = !0;
			function Ba(e) {
				const t = gd;
				return (gd = e), t;
			}
			const Bm = 255,
				Um = 5;
			let TT = 0;
			const tn = {};
			function Ua(e, t) {
				const n = $m(e, t);
				if (-1 !== n) return n;
				const r = t[E];
				r.firstCreatePass &&
					((e.injectorIndex = t.length), md(r.data, e), md(t, null), md(r.blueprint, null));
				const o = $a(e, t),
					i = e.injectorIndex;
				if (pd(o)) {
					const s = Vi(o),
						a = ji(o, t),
						u = a[E].data;
					for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
				}
				return (t[i + 8] = o), i;
			}
			function md(e, t) {
				e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
			}
			function $m(e, t) {
				return -1 === e.injectorIndex ||
					(e.parent && e.parent.injectorIndex === e.injectorIndex) ||
					null === t[e.injectorIndex + 8]
					? -1
					: e.injectorIndex;
			}
			function $a(e, t) {
				if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
				let n = 0,
					r = null,
					o = t;
				for (; null !== o; ) {
					if (((r = Qm(o)), null === r)) return lo;
					if ((n++, (o = o[Hr]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16);
				}
				return lo;
			}
			function vd(e, t, n) {
				!(function AT(e, t, n) {
					let r;
					"string" == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(_i) && (r = n[_i]),
						null == r && (r = n[_i] = TT++);
					const o = r & Bm;
					t.data[e + (o >> Um)] |= 1 << o;
				})(e, t, n);
			}
			function Hm(e, t, n) {
				if (n & $.Optional || void 0 !== e) return e;
				Bl();
			}
			function zm(e, t, n, r) {
				if ((n & $.Optional && void 0 === r && (r = null), !(n & ($.Self | $.Host)))) {
					const o = e[We],
						i = ct(void 0);
					try {
						return o ? o.get(t, r, n & $.Optional) : ym(t, r, n & $.Optional);
					} finally {
						ct(i);
					}
				}
				return Hm(r, 0, n);
			}
			function Gm(e, t, n, r = $.Default, o) {
				if (null !== e) {
					if (2048 & t[T] && !(r & $.Self)) {
						const s = (function PT(e, t, n, r, o) {
							let i = e,
								s = t;
							for (; null !== i && null !== s && 2048 & s[T] && !(512 & s[T]); ) {
								const a = qm(i, s, n, r | $.Self, tn);
								if (a !== tn) return a;
								let u = i.parent;
								if (!u) {
									const c = s[Vg];
									if (c) {
										const l = c.get(n, tn, r);
										if (l !== tn) return l;
									}
									(u = Qm(s)), (s = s[Hr]);
								}
								i = u;
							}
							return o;
						})(e, t, n, r, tn);
						if (s !== tn) return s;
					}
					const i = qm(e, t, n, r, tn);
					if (i !== tn) return i;
				}
				return zm(t, n, r, o);
			}
			function qm(e, t, n, r, o) {
				const i = (function xT(e) {
					if ("string" == typeof e) return e.charCodeAt(0) || 0;
					const t = e.hasOwnProperty(_i) ? e[_i] : void 0;
					return "number" == typeof t ? (t >= 0 ? t & Bm : OT) : t;
				})(n);
				if ("function" == typeof i) {
					if (!Kg(t, e, r)) return r & $.Host ? Hm(o, 0, r) : zm(t, n, r, o);
					try {
						let s;
						if (((s = i(r)), null != s || r & $.Optional)) return s;
						Bl();
					} finally {
						rm();
					}
				} else if ("number" == typeof i) {
					let s = null,
						a = $m(e, t),
						u = lo,
						c = r & $.Host ? t[De][qe] : null;
					for (
						(-1 === a || r & $.SkipSelf) &&
						((u = -1 === a ? $a(e, t) : t[a + 8]),
						u !== lo && Zm(r, !1) ? ((s = t[E]), (a = Vi(u)), (t = ji(u, t))) : (a = -1));
						-1 !== a;

					) {
						const l = t[E];
						if (Wm(i, a, l.data)) {
							const d = RT(a, t, n, s, r, c);
							if (d !== tn) return d;
						}
						(u = t[a + 8]),
							u !== lo && Zm(r, t[E].data[a + 8] === c) && Wm(i, a, t)
								? ((s = l), (a = Vi(u)), (t = ji(u, t)))
								: (a = -1);
					}
				}
				return o;
			}
			function RT(e, t, n, r, o, i) {
				const s = t[E],
					a = s.data[e + 8],
					l = (function Ha(e, t, n, r, o) {
						const i = e.providerIndexes,
							s = t.data,
							a = 1048575 & i,
							u = e.directiveStart,
							l = i >> 20,
							f = o ? a + l : e.directiveEnd;
						for (let h = r ? a : a + l; h < f; h++) {
							const p = s[h];
							if ((h < u && n === p) || (h >= u && p.type === n)) return h;
						}
						if (o) {
							const h = s[u];
							if (h && Vt(h) && h.type === n) return u;
						}
						return null;
					})(a, s, n, null == r ? hr(a) && gd : r != s && 0 != (3 & a.type), o & $.Host && i === a);
				return null !== l ? Dr(t, s, l, a) : tn;
			}
			function Dr(e, t, n, r) {
				let o = e[n];
				const i = t.data;
				if (
					(function ET(e) {
						return e instanceof Li;
					})(o)
				) {
					const s = o;
					s.resolving &&
						(function RS(e, t) {
							throw (t && t.join(" > "), new _(-200, e));
						})(
							(function Q(e) {
								return "function" == typeof e
									? e.name || e.toString()
									: "object" == typeof e && null != e && "function" == typeof e.type
									? e.type.name || e.type.toString()
									: V(e);
							})(i[n]),
						);
					const a = Ba(s.canSeeViewProviders);
					s.resolving = !0;
					const c = s.injectImpl ? ct(s.injectImpl) : null;
					Kg(e, r, $.Default);
					try {
						(o = e[n] = s.factory(void 0, i, e, r)),
							t.firstCreatePass &&
								n >= r.directiveStart &&
								(function CT(e, t, n) {
									const { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
									if (r) {
										const s = Fm(t);
										(n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
									}
									o && (n.preOrderHooks ??= []).push(0 - e, o),
										i &&
											((n.preOrderHooks ??= []).push(e, i),
											(n.preOrderCheckHooks ??= []).push(e, i));
								})(n, i[n], t);
					} finally {
						null !== c && ct(c), Ba(a), (s.resolving = !1), rm();
					}
				}
				return o;
			}
			function Wm(e, t, n) {
				return !!(n[t + (e >> Um)] & (1 << e));
			}
			function Zm(e, t) {
				return !(e & $.Self || (e & $.Host && t));
			}
			class Fe {
				constructor(t, n) {
					(this._tNode = t), (this._lView = n);
				}
				get(t, n, r) {
					return Gm(this._tNode, this._lView, t, Ea(r), n);
				}
			}
			function OT() {
				return new Fe(te(), y());
			}
			function Ve(e) {
				return mn(() => {
					const t = e.prototype.constructor,
						n = t[vn] || yd(t),
						r = Object.prototype;
					let o = Object.getPrototypeOf(e.prototype).constructor;
					for (; o && o !== r; ) {
						const i = o[vn] || yd(o);
						if (i && i !== n) return i;
						o = Object.getPrototypeOf(o);
					}
					return (i) => new i();
				});
			}
			function yd(e) {
				return Ca(e)
					? () => {
							const t = yd(R(e));
							return t && t();
					  }
					: mr(e);
			}
			function Qm(e) {
				const t = e[E],
					n = t.type;
				return 2 === n ? t.declTNode : 1 === n ? e[qe] : null;
			}
			function ev(e, t = null, n = null, r) {
				const o = tv(e, t, n, r);
				return o.resolveInjectorInitializers(), o;
			}
			function tv(e, t = null, n = null, r, o = new Set()) {
				const i = [n || W, JS(e)];
				return (
					(r = r || ("object" == typeof e ? void 0 : xe(e))), new ao(i, t || Fa(), r || null, o)
				);
			}
			let lt = (() => {
				class e {
					static #e = (this.THROW_IF_NOT_FOUND = Ri);
					static #t = (this.NULL = new Ra());
					static create(n, r) {
						if (Array.isArray(n)) return ev({ name: "" }, r, n, "");
						{
							const o = n.name ?? "";
							return ev({ name: o }, n.parent, n.providers, o);
						}
					}
					static #n = (this.ɵprov = M({ token: e, providedIn: "any", factory: () => S(Sm) }));
					static #r = (this.__NG_ELEMENT_ID__ = -1);
				}
				return e;
			})();
			function _d(e) {
				return e.ngOriginalError;
			}
			class En {
				constructor() {
					this._console = console;
				}
				handleError(t) {
					const n = this._findOriginalError(t);
					this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n);
				}
				_findOriginalError(t) {
					let n = t && _d(t);
					for (; n && _d(n); ) n = _d(n);
					return n || null;
				}
			}
			const rv = new b("", { providedIn: "root", factory: () => w(En).handleError.bind(void 0) }),
				iv = new b("", { providedIn: "root", factory: () => !1 });
			class cv {
				constructor(t) {
					this.changingThisBreaksApplicationSecurity = t;
				}
				toString() {
					return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Cg})`;
				}
			}
			const KT = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
			var go = (function (e) {
				return (
					(e[(e.NONE = 0)] = "NONE"),
					(e[(e.HTML = 1)] = "HTML"),
					(e[(e.STYLE = 2)] = "STYLE"),
					(e[(e.SCRIPT = 3)] = "SCRIPT"),
					(e[(e.URL = 4)] = "URL"),
					(e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
					e
				);
			})(go || {});
			function Sd(e) {
				const t = (function $i() {
					const e = y();
					return e && e[Dn].sanitizer;
				})();
				return t
					? t.sanitize(go.URL, e) || ""
					: (function Bi(e, t) {
							const n = (function QT(e) {
								return (e instanceof cv && e.getTypeName()) || null;
							})(e);
							if (null != n && n !== t) {
								if ("ResourceURL" === n && "URL" === t) return !0;
								throw new Error(`Required a safe ${t}, got a ${n} (see ${Cg})`);
							}
							return n === t;
					  })(e, "URL")
					? (function zn(e) {
							return e instanceof cv ? e.changingThisBreaksApplicationSecurity : e;
					  })(e)
					: (function Ed(e) {
							return (e = String(e)).match(KT) ? e : "unsafe:" + e;
					  })(V(e));
			}
			const fA = /^>|^->|<!--|-->|--!>|<!-$/g,
				hA = /(<|>)/g,
				pA = "\u200b$1\u200b";
			const Td = new Map();
			let DA = 0;
			const Nd = "__ngContext__";
			function Xe(e, t) {
				Ze(t)
					? ((e[Nd] = t[bi]),
					  (function CA(e) {
							Td.set(e[bi], e);
					  })(t))
					: (e[Nd] = t);
			}
			function Ct(e) {
				return e instanceof Function ? e() : e;
			}
			var qn = (function (e) {
				return (e[(e.Important = 1)] = "Important"), (e[(e.DashCase = 2)] = "DashCase"), e;
			})(qn || {});
			let Pd;
			function Fd(e, t) {
				return Pd(e, t);
			}
			function vo(e, t, n, r, o) {
				if (null != r) {
					let i,
						s = !1;
					Qe(r) ? (i = r) : Ze(r) && ((s = !0), (r = r[ve]));
					const a = oe(r);
					0 === e && null !== n
						? null == o
							? kv(t, n, a)
							: _r(t, n, a, o || null, !0)
						: 1 === e && null !== n
						? _r(t, n, a, o || null, !0)
						: 2 === e
						? (function ru(e, t, n) {
								const r = tu(e, t);
								r &&
									(function HA(e, t, n, r) {
										e.removeChild(t, n, r);
									})(e, r, t, n);
						  })(t, a, s)
						: 3 === e && t.destroyNode(a),
						null != i &&
							(function qA(e, t, n, r, o) {
								const i = n[Xt];
								i !== oe(n) && vo(t, e, r, i, o);
								for (let a = Ee; a < n.length; a++) {
									const u = n[a];
									ou(u[E], u, e, t, r, i);
								}
							})(t, e, i, n, o);
				}
			}
			function kd(e, t) {
				return e.createComment(
					(function yv(e) {
						return e.replace(fA, (t) => t.replace(hA, pA));
					})(t),
				);
			}
			function Ka(e, t, n) {
				return e.createElement(t, n);
			}
			function Ov(e, t) {
				ou(e, t, t[k], 2, null, null);
			}
			function Pv(e, t) {
				const n = e[Gr],
					r = n.indexOf(t);
				n.splice(r, 1);
			}
			function zi(e, t) {
				if (e.length <= Ee) return;
				const n = Ee + t,
					r = e[n];
				if (r) {
					const o = r[Ei];
					null !== o && o !== e && Pv(o, r), t > 0 && (e[n - 1][kt] = r[kt]);
					const i = ha(e, Ee + t);
					!(function kA(e, t) {
						Ov(e, t), (t[ve] = null), (t[qe] = null);
					})(r[E], r);
					const s = i[_n];
					null !== s && s.detachView(i[E]), (r[we] = null), (r[kt] = null), (r[T] &= -129);
				}
				return r;
			}
			function eu(e, t) {
				if (!(256 & t[T])) {
					const n = t[k];
					n.destroyNode && ou(e, t, n, 3, null, null),
						(function VA(e) {
							let t = e[wi];
							if (!t) return Ld(e[E], e);
							for (; t; ) {
								let n = null;
								if (Ze(t)) n = t[wi];
								else {
									const r = t[Ee];
									r && (n = r);
								}
								if (!n) {
									for (; t && !t[kt] && t !== e; ) Ze(t) && Ld(t[E], t), (t = t[we]);
									null === t && (t = e), Ze(t) && Ld(t[E], t), (n = t && t[kt]);
								}
								t = n;
							}
						})(t);
				}
			}
			function Ld(e, t) {
				if (!(256 & t[T])) {
					(t[T] &= -129),
						(t[T] |= 256),
						t[fr] &&
							(function ag(e) {
								if ((Br(e), yi(e)))
									for (let t = 0; t < e.producerNode.length; t++)
										ea(e.producerNode[t], e.producerIndexOfThis[t]);
								(e.producerNode.length =
									e.producerLastReadVersion.length =
									e.producerIndexOfThis.length =
										0),
									e.liveConsumerNode &&
										(e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
							})(t[fr]),
						(function $A(e, t) {
							let n;
							if (null != e && null != (n = e.destroyHooks))
								for (let r = 0; r < n.length; r += 2) {
									const o = t[n[r]];
									if (!(o instanceof Li)) {
										const i = n[r + 1];
										if (Array.isArray(i))
											for (let s = 0; s < i.length; s += 2) {
												const a = o[i[s]],
													u = i[s + 1];
												en(4, a, u);
												try {
													u.call(a);
												} finally {
													en(5, a, u);
												}
											}
										else {
											en(4, o, i);
											try {
												i.call(o);
											} finally {
												en(5, o, i);
											}
										}
									}
								}
						})(e, t),
						(function UA(e, t) {
							const n = e.cleanup,
								r = t[$r];
							if (null !== n)
								for (let i = 0; i < n.length - 1; i += 2)
									if ("string" == typeof n[i]) {
										const s = n[i + 3];
										s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
									} else n[i].call(r[n[i + 1]]);
							null !== r && (t[$r] = null);
							const o = t[Vn];
							if (null !== o) {
								t[Vn] = null;
								for (let i = 0; i < o.length; i++) (0, o[i])();
							}
						})(e, t),
						1 === t[E].type && t[k].destroy();
					const n = t[Ei];
					if (null !== n && Qe(t[we])) {
						n !== t[we] && Pv(n, t);
						const r = t[_n];
						null !== r && r.detachView(e);
					}
					!(function wA(e) {
						Td.delete(e[bi]);
					})(t);
				}
			}
			function Vd(e, t, n) {
				return (function Fv(e, t, n) {
					let r = t;
					for (; null !== r && 40 & r.type; ) r = (t = r).parent;
					if (null === r) return n[ve];
					{
						const { componentOffset: o } = r;
						if (o > -1) {
							const { encapsulation: i } = e.data[r.directiveStart + o];
							if (i === Pt.None || i === Pt.Emulated) return null;
						}
						return tt(r, n);
					}
				})(e, t.parent, n);
			}
			function _r(e, t, n, r, o) {
				e.insertBefore(t, n, r, o);
			}
			function kv(e, t, n) {
				e.appendChild(t, n);
			}
			function Lv(e, t, n, r, o) {
				null !== r ? _r(e, t, n, r, o) : kv(e, t, n);
			}
			function tu(e, t) {
				return e.parentNode(t);
			}
			function Vv(e, t, n) {
				return Bv(e, t, n);
			}
			let jd,
				Bv = function jv(e, t, n) {
					return 40 & e.type ? tt(e, n) : null;
				};
			function nu(e, t, n, r) {
				const o = Vd(e, r, t),
					i = t[k],
					a = Vv(r.parent || t[qe], r, t);
				if (null != o)
					if (Array.isArray(n)) for (let u = 0; u < n.length; u++) Lv(i, o, n[u], a, !1);
					else Lv(i, o, n, a, !1);
				void 0 !== jd && jd(i, r, t, n, o);
			}
			function Gi(e, t) {
				if (null !== t) {
					const n = t.type;
					if (3 & n) return tt(t, e);
					if (4 & n) return Bd(-1, e[t.index]);
					if (8 & n) {
						const r = t.child;
						if (null !== r) return Gi(e, r);
						{
							const o = e[t.index];
							return Qe(o) ? Bd(-1, o) : oe(o);
						}
					}
					if (32 & n) return Fd(t, e)() || oe(e[t.index]);
					{
						const r = $v(e, t);
						return null !== r ? (Array.isArray(r) ? r[0] : Gi(pr(e[De]), r)) : Gi(e, t.next);
					}
				}
				return null;
			}
			function $v(e, t) {
				return null !== t ? e[De][qe].projection[t.projection] : null;
			}
			function Bd(e, t) {
				const n = Ee + e + 1;
				if (n < t.length) {
					const r = t[n],
						o = r[E].firstChild;
					if (null !== o) return Gi(r, o);
				}
				return t[Xt];
			}
			function Ud(e, t, n, r, o, i, s) {
				for (; null != n; ) {
					const a = r[n.index],
						u = n.type;
					if ((s && 0 === t && (a && Xe(oe(a), r), (n.flags |= 2)), 32 != (32 & n.flags)))
						if (8 & u) Ud(e, t, n.child, r, o, i, !1), vo(t, e, o, a, i);
						else if (32 & u) {
							const c = Fd(n, r);
							let l;
							for (; (l = c()); ) vo(t, e, o, l, i);
							vo(t, e, o, a, i);
						} else 16 & u ? zv(e, t, r, n, o, i) : vo(t, e, o, a, i);
					n = s ? n.projectionNext : n.next;
				}
			}
			function ou(e, t, n, r, o, i) {
				Ud(n, r, e.firstChild, t, o, i, !1);
			}
			function zv(e, t, n, r, o, i) {
				const s = n[De],
					u = s[qe].projection[r.projection];
				if (Array.isArray(u)) for (let c = 0; c < u.length; c++) vo(t, e, o, u[c], i);
				else {
					let c = u;
					const l = s[we];
					ga(r) && (c.flags |= 128), Ud(e, t, c, l, o, i, !0);
				}
			}
			function Gv(e, t, n) {
				"" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
			}
			function qv(e, t, n) {
				const { mergedAttrs: r, classes: o, styles: i } = n;
				null !== r && dl(e, t, r),
					null !== o && Gv(e, t, o),
					null !== i &&
						(function ZA(e, t, n) {
							e.setAttribute(t, "style", n);
						})(e, t, i);
			}
			const j = {};
			function ie(e = 1) {
				Wv(H(), y(), Ye() + e, !1);
			}
			function Wv(e, t, n, r) {
				if (!r)
					if (3 == (3 & t[T])) {
						const i = e.preOrderCheckHooks;
						null !== i && Va(t, i, n);
					} else {
						const i = e.preOrderHooks;
						null !== i && ja(t, i, 0, n);
					}
				gr(n);
			}
			function C(e, t = $.Default) {
				const n = y();
				return null === n ? S(e, t) : Gm(te(), n, R(e), t);
			}
			function Qv(e, t, n, r, o, i) {
				const s = _e(null);
				try {
					let a = null;
					o & me.SignalBased && (a = t[r][ur]),
						null !== a && void 0 !== a.transformFn && (i = a.transformFn(i)),
						o & me.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(t, i)),
						null !== e.setInput ? e.setInput(t, a, i, n, r) : Pm(t, a, r, i);
				} finally {
					_e(s);
				}
			}
			function iu(e, t, n, r, o, i, s, a, u, c, l) {
				const d = t.blueprint.slice();
				return (
					(d[ve] = o),
					(d[T] = 204 | r),
					(null !== c || (e && 2048 & e[T])) && (d[T] |= 2048),
					Gg(d),
					(d[we] = d[Hr] = e),
					(d[ue] = n),
					(d[Dn] = s || (e && e[Dn])),
					(d[k] = a || (e && e[k])),
					(d[We] = u || (e && e[We]) || null),
					(d[qe] = i),
					(d[bi] = (function _A() {
						return DA++;
					})()),
					(d[Lt] = l),
					(d[Vg] = c),
					(d[De] = 2 == t.type ? e[De] : d),
					d
				);
			}
			function yo(e, t, n, r, o) {
				let i = e.data[t];
				if (null === i)
					(i = (function $d(e, t, n, r, o) {
						const i = Qg(),
							s = El(),
							u = (e.data[t] = (function nN(e, t, n, r, o, i) {
								let s = t ? t.injectorIndex : -1,
									a = 0;
								return (
									Wr() && (a |= 128),
									{
										type: n,
										index: r,
										insertBeforeIndex: null,
										injectorIndex: s,
										directiveStart: -1,
										directiveEnd: -1,
										directiveStylingLast: -1,
										componentOffset: -1,
										propertyBindings: null,
										flags: a,
										providerIndexes: 0,
										value: o,
										attrs: i,
										mergedAttrs: null,
										localNames: null,
										initialInputs: void 0,
										inputs: null,
										outputs: null,
										tView: null,
										next: null,
										prev: null,
										projectionNext: null,
										child: null,
										parent: t,
										projection: null,
										styles: null,
										stylesWithoutHost: null,
										residualStyles: void 0,
										classes: null,
										classesWithoutHost: null,
										residualClasses: void 0,
										classBindings: 0,
										styleBindings: 0,
									}
								);
							})(0, s ? i : i && i.parent, n, t, r, o));
						return (
							null === e.firstChild && (e.firstChild = u),
							null !== i &&
								(s
									? null == i.child && null !== u.parent && (i.child = u)
									: null === i.next && ((i.next = u), (u.prev = i))),
							u
						);
					})(e, t, n, r, o)),
						(function uS() {
							return x.lFrame.inI18n;
						})() && (i.flags |= 32);
				else if (64 & i.type) {
					(i.type = n), (i.value = r), (i.attrs = o);
					const s = (function Ai() {
						const e = x.lFrame,
							t = e.currentTNode;
						return e.isParent ? t : t.parent;
					})();
					i.injectorIndex = null === s ? -1 : s.injectorIndex;
				}
				return Kt(i, !0), i;
			}
			function qi(e, t, n, r) {
				if (0 === n) return -1;
				const o = t.length;
				for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
				return o;
			}
			function Yv(e, t, n, r, o) {
				const i = Ye(),
					s = 2 & r;
				try {
					gr(-1), s && t.length > L && Wv(e, t, L, !1), en(s ? 2 : 0, o), n(r, o);
				} finally {
					gr(i), en(s ? 3 : 1, o);
				}
			}
			function Hd(e, t, n) {
				if (pl(t)) {
					const r = _e(null);
					try {
						const i = t.directiveEnd;
						for (let s = t.directiveStart; s < i; s++) {
							const a = e.data[s];
							a.contentQueries && a.contentQueries(1, n[s], s);
						}
					} finally {
						_e(r);
					}
				}
			}
			function zd(e, t, n) {
				Zg() &&
					((function cN(e, t, n, r) {
						const o = n.directiveStart,
							i = n.directiveEnd;
						hr(n) &&
							(function mN(e, t, n) {
								const r = tt(t, e),
									o = Xv(n);
								let s = 16;
								n.signals ? (s = 4096) : n.onPush && (s = 64);
								const a = su(
									e,
									iu(
										e,
										o,
										null,
										s,
										r,
										t,
										null,
										e[Dn].rendererFactory.createRenderer(r, n),
										null,
										null,
										null,
									),
								);
								e[t.index] = a;
							})(t, n, e.data[o + n.componentOffset]),
							e.firstCreatePass || Ua(n, t),
							Xe(r, t);
						const s = n.initialInputs;
						for (let a = o; a < i; a++) {
							const u = e.data[a],
								c = Dr(t, e, a, n);
							Xe(c, t),
								null !== s && vN(0, a - o, c, u, 0, s),
								Vt(u) && (vt(n.index, t)[ue] = Dr(t, e, a, n));
						}
					})(e, t, n, tt(n, t)),
					64 == (64 & n.flags) && ny(e, t, n));
			}
			function Gd(e, t, n = tt) {
				const r = t.localNames;
				if (null !== r) {
					let o = t.index + 1;
					for (let i = 0; i < r.length; i += 2) {
						const s = r[i + 1],
							a = -1 === s ? n(t, e) : e[s];
						e[o++] = a;
					}
				}
			}
			function Xv(e) {
				const t = e.tView;
				return null === t || t.incompleteFirstPass
					? (e.tView = qd(
							1,
							null,
							e.template,
							e.decls,
							e.vars,
							e.directiveDefs,
							e.pipeDefs,
							e.viewQuery,
							e.schemas,
							e.consts,
							e.id,
					  ))
					: t;
			}
			function qd(e, t, n, r, o, i, s, a, u, c, l) {
				const d = L + r,
					f = d + o,
					h = (function YA(e, t) {
						const n = [];
						for (let r = 0; r < t; r++) n.push(r < e ? null : j);
						return n;
					})(d, f),
					p = "function" == typeof c ? c() : c;
				return (h[E] = {
					type: e,
					blueprint: h,
					template: n,
					queries: null,
					viewQuery: a,
					declTNode: t,
					data: h.slice().fill(null, d),
					bindingStartIndex: d,
					expandoStartIndex: f,
					hostBindingOpCodes: null,
					firstCreatePass: !0,
					firstUpdatePass: !0,
					staticViewQueries: !1,
					staticContentQueries: !1,
					preOrderHooks: null,
					preOrderCheckHooks: null,
					contentHooks: null,
					contentCheckHooks: null,
					viewHooks: null,
					viewCheckHooks: null,
					destroyHooks: null,
					cleanup: null,
					contentQueries: null,
					components: null,
					directiveRegistry: "function" == typeof i ? i() : i,
					pipeRegistry: "function" == typeof s ? s() : s,
					firstChild: null,
					schemas: u,
					consts: p,
					incompleteFirstPass: !1,
					ssrId: l,
				});
			}
			let Jv = () => null;
			function Kv(e, t, n, r, o) {
				for (let i in t) {
					if (!t.hasOwnProperty(i)) continue;
					const s = t[i];
					if (void 0 === s) continue;
					r ??= {};
					let a,
						u = me.None;
					Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
					let c = i;
					if (null !== o) {
						if (!o.hasOwnProperty(i)) continue;
						c = o[i];
					}
					0 === e ? ey(r, n, c, a, u) : ey(r, n, c, a);
				}
				return r;
			}
			function ey(e, t, n, r, o) {
				let i;
				e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
					void 0 !== o && i.push(o);
			}
			function ft(e, t, n, r, o, i, s, a) {
				const u = tt(t, n);
				let l,
					c = t.inputs;
				!a && null != c && (l = c[r])
					? (Xd(e, n, l, r, o),
					  hr(t) &&
							(function iN(e, t) {
								const n = vt(t, e);
								16 & n[T] || (n[T] |= 64);
							})(n, t.index))
					: 3 & t.type &&
					  ((r = (function oN(e) {
							return "class" === e
								? "className"
								: "for" === e
								? "htmlFor"
								: "formaction" === e
								? "formAction"
								: "innerHtml" === e
								? "innerHTML"
								: "readonly" === e
								? "readOnly"
								: "tabindex" === e
								? "tabIndex"
								: e;
					  })(r)),
					  (o = null != s ? s(o, t.value || "", r) : o),
					  i.setProperty(u, r, o));
			}
			function Wd(e, t, n, r) {
				if (Zg()) {
					const o = null === r ? null : { "": -1 },
						i = (function dN(e, t) {
							const n = e.directiveRegistry;
							let r = null,
								o = null;
							if (n)
								for (let i = 0; i < n.length; i++) {
									const s = n[i];
									if (xg(t, s.selectors, !1))
										if ((r || (r = []), Vt(s)))
											if (null !== s.findHostDirectiveDefs) {
												const a = [];
												(o = o || new Map()),
													s.findHostDirectiveDefs(s, a, o),
													r.unshift(...a, s),
													Zd(e, t, a.length);
											} else r.unshift(s), Zd(e, t, 0);
										else (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
								}
							return null === r ? null : [r, o];
						})(e, n);
					let s, a;
					null === i ? (s = a = null) : ([s, a] = i),
						null !== s && ty(e, t, n, s, o, a),
						o &&
							(function fN(e, t, n) {
								if (t) {
									const r = (e.localNames = []);
									for (let o = 0; o < t.length; o += 2) {
										const i = n[t[o + 1]];
										if (null == i) throw new _(-301, !1);
										r.push(t[o], i);
									}
								}
							})(n, r, o);
				}
				n.mergedAttrs = Ci(n.mergedAttrs, n.attrs);
			}
			function ty(e, t, n, r, o, i) {
				for (let c = 0; c < r.length; c++) vd(Ua(n, t), e, r[c].type);
				!(function pN(e, t, n) {
					(e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
				})(n, e.data.length, r.length);
				for (let c = 0; c < r.length; c++) {
					const l = r[c];
					l.providersResolver && l.providersResolver(l);
				}
				let s = !1,
					a = !1,
					u = qi(e, t, r.length, null);
				for (let c = 0; c < r.length; c++) {
					const l = r[c];
					(n.mergedAttrs = Ci(n.mergedAttrs, l.hostAttrs)),
						gN(e, n, t, u, l),
						hN(u, l, o),
						null !== l.contentQueries && (n.flags |= 4),
						(null !== l.hostBindings || null !== l.hostAttrs || 0 !== l.hostVars) &&
							(n.flags |= 64);
					const d = l.type.prototype;
					!s &&
						(d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
						((e.preOrderHooks ??= []).push(n.index), (s = !0)),
						!a &&
							(d.ngOnChanges || d.ngDoCheck) &&
							((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
						u++;
				}
				!(function rN(e, t, n) {
					const o = t.directiveEnd,
						i = e.data,
						s = t.attrs,
						a = [];
					let u = null,
						c = null;
					for (let l = t.directiveStart; l < o; l++) {
						const d = i[l],
							f = n ? n.get(d) : null,
							p = f ? f.outputs : null;
						(u = Kv(0, d.inputs, l, u, f ? f.inputs : null)), (c = Kv(1, d.outputs, l, c, p));
						const g = null === u || null === s || Rg(t) ? null : yN(u, l, s);
						a.push(g);
					}
					null !== u &&
						(u.hasOwnProperty("class") && (t.flags |= 8),
						u.hasOwnProperty("style") && (t.flags |= 16)),
						(t.initialInputs = a),
						(t.inputs = u),
						(t.outputs = c);
				})(e, n, i);
			}
			function ny(e, t, n) {
				const r = n.directiveStart,
					o = n.directiveEnd,
					i = n.index,
					s = (function lS() {
						return x.lFrame.currentDirectiveIndex;
					})();
				try {
					gr(i);
					for (let a = r; a < o; a++) {
						const u = e.data[a],
							c = t[a];
						Il(a),
							(null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && lN(u, c);
					}
				} finally {
					gr(-1), Il(s);
				}
			}
			function lN(e, t) {
				null !== e.hostBindings && e.hostBindings(1, t);
			}
			function Zd(e, t, n) {
				(t.componentOffset = n), (e.components ??= []).push(t.index);
			}
			function hN(e, t, n) {
				if (n) {
					if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
					Vt(t) && (n[""] = e);
				}
			}
			function gN(e, t, n, r, o) {
				e.data[r] = o;
				const i = o.factory || (o.factory = mr(o.type)),
					s = new Li(i, Vt(o), C);
				(e.blueprint[r] = s),
					(n[r] = s),
					(function aN(e, t, n, r, o) {
						const i = o.hostBindings;
						if (i) {
							let s = e.hostBindingOpCodes;
							null === s && (s = e.hostBindingOpCodes = []);
							const a = ~t.index;
							(function uN(e) {
								let t = e.length;
								for (; t > 0; ) {
									const n = e[--t];
									if ("number" == typeof n && n < 0) return n;
								}
								return 0;
							})(s) != a && s.push(a),
								s.push(n, r, i);
						}
					})(e, t, r, qi(e, n, o.hostVars, j), o);
			}
			function vN(e, t, n, r, o, i) {
				const s = i[t];
				if (null !== s) for (let a = 0; a < s.length; ) Qv(r, n, s[a++], s[a++], s[a++], s[a++]);
			}
			function yN(e, t, n) {
				let r = null,
					o = 0;
				for (; o < n.length; ) {
					const i = n[o];
					if (0 !== i)
						if (5 !== i) {
							if ("number" == typeof i) break;
							if (e.hasOwnProperty(i)) {
								null === r && (r = []);
								const s = e[i];
								for (let a = 0; a < s.length; a += 3)
									if (s[a] === t) {
										r.push(i, s[a + 1], s[a + 2], n[o + 1]);
										break;
									}
							}
							o += 2;
						} else o += 2;
					else o += 4;
				}
				return r;
			}
			function ry(e, t, n, r) {
				return [e, !0, 0, t, null, r, null, n, null, null];
			}
			function oy(e, t) {
				const n = e.contentQueries;
				if (null !== n) {
					const r = _e(null);
					try {
						for (let o = 0; o < n.length; o += 2) {
							const s = n[o + 1];
							if (-1 !== s) {
								const a = e.data[s];
								da(n[o]), a.contentQueries(2, t[s], s);
							}
						}
					} finally {
						_e(r);
					}
				}
			}
			function su(e, t) {
				return e[wi] ? (e[Lg][kt] = t) : (e[wi] = t), (e[Lg] = t), t;
			}
			function Yd(e, t, n) {
				da(0);
				const r = _e(null);
				try {
					t(e, n);
				} finally {
					_e(r);
				}
			}
			function au(e, t) {
				const n = e[We],
					r = n ? n.get(En, null) : null;
				r && r.handleError(t);
			}
			function Xd(e, t, n, r, o) {
				for (let i = 0; i < n.length; ) {
					const s = n[i++],
						a = n[i++],
						u = n[i++];
					Qv(e.data[s], t[s], r, a, u, o);
				}
			}
			function In(e, t, n) {
				const r = (function Mi(e, t) {
					return oe(t[e]);
				})(t, e);
				!(function xv(e, t, n) {
					e.setValue(t, n);
				})(e[k], r, n);
			}
			function DN(e, t) {
				const n = vt(t, e),
					r = n[E];
				!(function _N(e, t) {
					for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
				})(r, n);
				const o = n[ve];
				null !== o && null === n[Lt] && (n[Lt] = Xl(o, n[We])), Jd(r, n, n[ue]);
			}
			function Jd(e, t, n) {
				Tl(t);
				try {
					const r = e.viewQuery;
					null !== r && Yd(1, r, n);
					const o = e.template;
					null !== o && Yv(e, t, o, 1, n),
						e.firstCreatePass && (e.firstCreatePass = !1),
						t[_n]?.finishViewCreation(e),
						e.staticContentQueries && oy(e, t),
						e.staticViewQueries && Yd(2, e.viewQuery, n);
					const i = e.components;
					null !== i &&
						(function CN(e, t) {
							for (let n = 0; n < t.length; n++) DN(e, t[n]);
						})(t, i);
				} catch (r) {
					throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
				} finally {
					(t[T] &= -5), Al();
				}
			}
			function Do(e, t) {
				return !t || null === t.firstChild || ga(e);
			}
			function Zi(e, t, n, r = !0) {
				const o = t[E];
				if (
					((function jA(e, t, n, r) {
						const o = Ee + r,
							i = n.length;
						r > 0 && (n[o - 1][kt] = t),
							r < i - Ee ? ((t[kt] = n[o]), am(n, Ee + r, t)) : (n.push(t), (t[kt] = null)),
							(t[we] = n);
						const s = t[Ei];
						null !== s &&
							n !== s &&
							(function BA(e, t) {
								const n = e[Gr];
								t[De] !== t[we][we][De] && (e[T] |= hl.HasTransplantedViews),
									null === n ? (e[Gr] = [t]) : n.push(t);
							})(s, t);
						const a = t[_n];
						null !== a && a.insertView(e), Cl(t), (t[T] |= 128);
					})(o, t, e, n),
					r)
				) {
					const s = Bd(n, e),
						a = t[k],
						u = tu(a, e[Xt]);
					null !== u &&
						(function LA(e, t, n, r, o, i) {
							(r[ve] = o), (r[qe] = t), ou(e, r, n, 1, o, i);
						})(o, e[qe], a, t, u, s);
				}
				const i = t[Lt];
				null !== i && null !== i.firstChild && (i.firstChild = null);
			}
			function Qi(e, t, n, r, o = !1) {
				for (; null !== n; ) {
					const i = t[n.index];
					null !== i && r.push(oe(i)), Qe(i) && cy(i, r);
					const s = n.type;
					if (8 & s) Qi(e, t, n.child, r);
					else if (32 & s) {
						const a = Fd(n, t);
						let u;
						for (; (u = a()); ) r.push(u);
					} else if (16 & s) {
						const a = $v(t, n);
						if (Array.isArray(a)) r.push(...a);
						else {
							const u = pr(t[De]);
							Qi(u[E], u, a, r, !0);
						}
					}
					n = o ? n.projectionNext : n.next;
				}
				return r;
			}
			function cy(e, t) {
				for (let n = Ee; n < e.length; n++) {
					const r = e[n],
						o = r[E].firstChild;
					null !== o && Qi(r[E], r, o, t);
				}
				e[Xt] !== e[ve] && t.push(e[Xt]);
			}
			let ly = [];
			const IN = {
				version: 0,
				lastCleanEpoch: 0,
				dirty: !1,
				producerNode: void 0,
				producerLastReadVersion: void 0,
				producerIndexOfThis: void 0,
				nextProducerIndex: 0,
				liveConsumerNode: void 0,
				liveConsumerIndexOfThis: void 0,
				consumerAllowSignalWrites: !1,
				consumerIsAlwaysLive: !1,
				producerMustRecompute: () => !1,
				producerRecomputeValue: () => {},
				consumerMarkedDirty: () => {},
				consumerOnSignalRead: () => {},
				consumerIsAlwaysLive: !0,
				consumerMarkedDirty: (e) => {
					Ti(e.lView);
				},
				consumerOnSignalRead() {
					this.lView[fr] = this;
				},
			};
			function dy(e) {
				return hy(e[wi]);
			}
			function fy(e) {
				return hy(e[kt]);
			}
			function hy(e) {
				for (; null !== e && !Qe(e); ) e = e[kt];
				return e;
			}
			function uu(e, t = !0, n = 0) {
				const r = e[Dn],
					o = r.rendererFactory;
				o.begin?.();
				try {
					!(function TN(e, t) {
						ef(e, t);
						let n = 0;
						for (; _l(e); ) {
							if (100 === n) throw new _(103, !1);
							n++, ef(e, 1);
						}
					})(e, n);
				} catch (s) {
					throw (t && au(e, s), s);
				} finally {
					o.end?.(), r.inlineEffectRunner?.flush();
				}
			}
			function AN(e, t, n, r) {
				const o = t[T];
				if (256 == (256 & o)) return;
				t[Dn].inlineEffectRunner?.flush(), Tl(t);
				let s = null,
					a = null;
				(function NN(e) {
					return 2 !== e.type;
				})(e) &&
					((a = (function wN(e) {
						return (
							e[fr] ??
							(function EN(e) {
								const t = ly.pop() ?? Object.create(IN);
								return (t.lView = e), t;
							})(e)
						);
					})(t)),
					(s = (function ig(e) {
						return e && (e.nextProducerIndex = 0), _e(e);
					})(a)));
				try {
					Gg(t),
						(function Xg(e) {
							return (x.lFrame.bindingIndex = e);
						})(e.bindingStartIndex),
						null !== n && Yv(e, t, n, 2, r);
					const u = 3 == (3 & o);
					if (u) {
						const d = e.preOrderCheckHooks;
						null !== d && Va(t, d, null);
					} else {
						const d = e.preOrderHooks;
						null !== d && ja(t, d, 0, null), fd(t, 0);
					}
					if (
						((function RN(e) {
							for (let t = dy(e); null !== t; t = fy(t)) {
								if (!(t[T] & hl.HasTransplantedViews)) continue;
								const n = t[Gr];
								for (let r = 0; r < n.length; r++) {
									J0(n[r]);
								}
							}
						})(t),
						gy(t, 0),
						null !== e.contentQueries && oy(e, t),
						u)
					) {
						const d = e.contentCheckHooks;
						null !== d && Va(t, d);
					} else {
						const d = e.contentHooks;
						null !== d && ja(t, d, 1), fd(t, 1);
					}
					!(function QA(e, t) {
						const n = e.hostBindingOpCodes;
						if (null !== n)
							try {
								for (let r = 0; r < n.length; r++) {
									const o = n[r];
									if (o < 0) gr(~o);
									else {
										const i = o,
											s = n[++r],
											a = n[++r];
										cS(s, i), a(2, t[i]);
									}
								}
							} finally {
								gr(-1);
							}
					})(e, t);
					const c = e.components;
					null !== c && vy(t, c, 0);
					const l = e.viewQuery;
					if ((null !== l && Yd(2, l, r), u)) {
						const d = e.viewCheckHooks;
						null !== d && Va(t, d);
					} else {
						const d = e.viewHooks;
						null !== d && ja(t, d, 2), fd(t, 2);
					}
					if ((!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[aa])) {
						for (const d of t[aa]) d();
						t[aa] = null;
					}
					t[T] &= -73;
				} catch (u) {
					throw (Ti(t), u);
				} finally {
					null !== a &&
						((function sg(e, t) {
							if (
								(_e(t),
								e &&
									void 0 !== e.producerNode &&
									void 0 !== e.producerIndexOfThis &&
									void 0 !== e.producerLastReadVersion)
							) {
								if (yi(e))
									for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
										ea(e.producerNode[n], e.producerIndexOfThis[n]);
								for (; e.producerNode.length > e.nextProducerIndex; )
									e.producerNode.pop(),
										e.producerLastReadVersion.pop(),
										e.producerIndexOfThis.pop();
							}
						})(a, s),
						(function bN(e) {
							e.lView[fr] !== e && ((e.lView = null), ly.push(e));
						})(a)),
						Al();
				}
			}
			function gy(e, t) {
				for (let n = dy(e); null !== n; n = fy(n)) for (let r = Ee; r < n.length; r++) my(n[r], t);
			}
			function xN(e, t, n) {
				my(vt(t, e), n);
			}
			function my(e, t) {
				Dl(e) && ef(e, t);
			}
			function ef(e, t) {
				const r = e[E],
					o = e[T],
					i = e[fr];
				let s = !!(0 === t && 16 & o);
				if (
					((s ||= !!(64 & o && 0 === t)),
					(s ||= !!(1024 & o)),
					(s ||= !(!i?.dirty || !Qc(i))),
					i && (i.dirty = !1),
					(e[T] &= -9217),
					s)
				)
					AN(r, e, r.template, e[ue]);
				else if (8192 & o) {
					gy(e, 1);
					const a = r.components;
					null !== a && vy(e, a, 1);
				}
			}
			function vy(e, t, n) {
				for (let r = 0; r < t.length; r++) xN(e, t[r], n);
			}
			function Yi(e) {
				for (e[Dn].changeDetectionScheduler?.notify(); e; ) {
					e[T] |= 64;
					const t = pr(e);
					if (gl(e) && !t) return e;
					e = t;
				}
				return null;
			}
			class Xi {
				get rootNodes() {
					const t = this._lView,
						n = t[E];
					return Qi(n, t, n.firstChild, []);
				}
				constructor(t, n, r = !0) {
					(this._lView = t),
						(this._cdRefInjectingView = n),
						(this.notifyErrorHandler = r),
						(this._appRef = null),
						(this._attachedToViewContainer = !1);
				}
				get context() {
					return this._lView[ue];
				}
				set context(t) {
					this._lView[ue] = t;
				}
				get destroyed() {
					return 256 == (256 & this._lView[T]);
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._attachedToViewContainer) {
						const t = this._lView[we];
						if (Qe(t)) {
							const n = t[8],
								r = n ? n.indexOf(this) : -1;
							r > -1 && (zi(t, r), ha(n, r));
						}
						this._attachedToViewContainer = !1;
					}
					eu(this._lView[E], this._lView);
				}
				onDestroy(t) {
					la(this._lView, t);
				}
				markForCheck() {
					Yi(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[T] &= -129;
				}
				reattach() {
					Cl(this._lView), (this._lView[T] |= 128);
				}
				detectChanges() {
					(this._lView[T] |= 1024), uu(this._lView, this.notifyErrorHandler);
				}
				checkNoChanges() {}
				attachToViewContainerRef() {
					if (this._appRef) throw new _(902, !1);
					this._attachedToViewContainer = !0;
				}
				detachFromAppRef() {
					(this._appRef = null), Ov(this._lView[E], this._lView);
				}
				attachToAppRef(t) {
					if (this._attachedToViewContainer) throw new _(902, !1);
					(this._appRef = t), Cl(this._lView);
				}
			}
			let Mn = (() => {
				class e {
					static #e = (this.__NG_ELEMENT_ID__ = FN);
				}
				return e;
			})();
			const ON = Mn,
				PN = class extends ON {
					constructor(t, n, r) {
						super(),
							(this._declarationLView = t),
							(this._declarationTContainer = n),
							(this.elementRef = r);
					}
					get ssrId() {
						return this._declarationTContainer.tView?.ssrId || null;
					}
					createEmbeddedView(t, n) {
						return this.createEmbeddedViewImpl(t, n);
					}
					createEmbeddedViewImpl(t, n, r) {
						const o = (function Wi(e, t, n, r) {
							const o = t.tView,
								a = iu(
									e,
									o,
									n,
									4096 & e[T] ? 4096 : 16,
									null,
									t,
									null,
									null,
									null,
									r?.injector ?? null,
									r?.dehydratedView ?? null,
								);
							a[Ei] = e[t.index];
							const c = e[_n];
							return null !== c && (a[_n] = c.createEmbeddedView(o)), Jd(o, a, n), a;
						})(this._declarationLView, this._declarationTContainer, t, {
							injector: n,
							dehydratedView: r,
						});
						return new Xi(o);
					}
				};
			function FN() {
				return cu(te(), y());
			}
			function cu(e, t) {
				return 4 & e.type ? new PN(t, e, Yr(e, t)) : null;
			}
			class by {}
			class rR {}
			class Iy {}
			class iR {
				resolveComponentFactory(t) {
					throw (function oR(e) {
						const t = Error(`No component factory found for ${xe(e)}.`);
						return (t.ngComponent = e), t;
					})(t);
				}
			}
			let pu = (() => {
				class e {
					static #e = (this.NULL = new iR());
				}
				return e;
			})();
			class Sy {}
			let Sn = (() => {
					class e {
						constructor() {
							this.destroyNode = null;
						}
						static #e = (this.__NG_ELEMENT_ID__ = () =>
							(function sR() {
								const e = y(),
									n = vt(te().index, e);
								return (Ze(n) ? n : e)[k];
							})());
					}
					return e;
				})(),
				aR = (() => {
					class e {
						static #e = (this.ɵprov = M({ token: e, providedIn: "root", factory: () => null }));
					}
					return e;
				})();
			const uf = {};
			function Ay(e) {
				return (
					(function Ty(e) {
						return "function" == typeof e && void 0 !== e[ur];
					})(e) && "function" == typeof e.set
				);
			}
			function Ny(e) {
				const t = _e(null);
				try {
					return e();
				} finally {
					_e(t);
				}
			}
			function gu(e) {
				return (
					!!(function cf(e) {
						return null !== e && ("function" == typeof e || "object" == typeof e);
					})(e) &&
					(Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
				);
			}
			class Ry {
				constructor() {}
				supports(t) {
					return gu(t);
				}
				create(t) {
					return new hR(t);
				}
			}
			const fR = (e, t) => t;
			class hR {
				constructor(t) {
					(this.length = 0),
						(this._linkedRecords = null),
						(this._unlinkedRecords = null),
						(this._previousItHead = null),
						(this._itHead = null),
						(this._itTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._movesHead = null),
						(this._movesTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null),
						(this._identityChangesHead = null),
						(this._identityChangesTail = null),
						(this._trackByFn = t || fR);
				}
				forEachItem(t) {
					let n;
					for (n = this._itHead; null !== n; n = n._next) t(n);
				}
				forEachOperation(t) {
					let n = this._itHead,
						r = this._removalsHead,
						o = 0,
						i = null;
					for (; n || r; ) {
						const s = !r || (n && n.currentIndex < Oy(r, o, i)) ? n : r,
							a = Oy(s, o, i),
							u = s.currentIndex;
						if (s === r) o--, (r = r._nextRemoved);
						else if (((n = n._next), null == s.previousIndex)) o++;
						else {
							i || (i = []);
							const c = a - o,
								l = u - o;
							if (c != l) {
								for (let f = 0; f < c; f++) {
									const h = f < i.length ? i[f] : (i[f] = 0),
										p = h + f;
									l <= p && p < c && (i[f] = h + 1);
								}
								i[s.previousIndex] = l - c;
							}
						}
						a !== u && t(s, a, u);
					}
				}
				forEachPreviousItem(t) {
					let n;
					for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
				}
				forEachAddedItem(t) {
					let n;
					for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
				}
				forEachMovedItem(t) {
					let n;
					for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
				}
				forEachRemovedItem(t) {
					let n;
					for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
				}
				forEachIdentityChange(t) {
					let n;
					for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n);
				}
				diff(t) {
					if ((null == t && (t = []), !gu(t))) throw new _(900, !1);
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let o,
						i,
						s,
						n = this._itHead,
						r = !1;
					if (Array.isArray(t)) {
						this.length = t.length;
						for (let a = 0; a < this.length; a++)
							(i = t[a]),
								(s = this._trackByFn(a, i)),
								null !== n && Object.is(n.trackById, s)
									? (r && (n = this._verifyReinsertion(n, i, s, a)),
									  Object.is(n.item, i) || this._addIdentityChange(n, i))
									: ((n = this._mismatch(n, i, s, a)), (r = !0)),
								(n = n._next);
					} else
						(o = 0),
							(function dR(e, t) {
								if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
								else {
									const n = e[Symbol.iterator]();
									let r;
									for (; !(r = n.next()).done; ) t(r.value);
								}
							})(t, (a) => {
								(s = this._trackByFn(o, a)),
									null !== n && Object.is(n.trackById, s)
										? (r && (n = this._verifyReinsertion(n, a, s, o)),
										  Object.is(n.item, a) || this._addIdentityChange(n, a))
										: ((n = this._mismatch(n, a, s, o)), (r = !0)),
									(n = n._next),
									o++;
							}),
							(this.length = o);
					return this._truncate(n), (this.collection = t), this.isDirty;
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._movesHead ||
						null !== this._removalsHead ||
						null !== this._identityChangesHead
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
							t._nextPrevious = t._next;
						for (t = this._additionsHead; null !== t; t = t._nextAdded)
							t.previousIndex = t.currentIndex;
						for (
							this._additionsHead = this._additionsTail = null, t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex;
						(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(t, n, r, o) {
					let i;
					return (
						null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
						null !==
						(t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n),
							  this._reinsertAfter(t, i, o))
							: null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o))
							? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o))
							: (t = this._addAfter(new pR(n, r), i, o)),
						t
					);
				}
				_verifyReinsertion(t, n, r, o) {
					let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
					return (
						null !== i
							? (t = this._reinsertAfter(i, t._prev, o))
							: t.currentIndex != o && ((t.currentIndex = o), this._addToMoves(t, o)),
						t
					);
				}
				_truncate(t) {
					for (; null !== t; ) {
						const n = t._next;
						this._addToRemovals(this._unlink(t)), (t = n);
					}
					null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
						null !== this._additionsTail && (this._additionsTail._nextAdded = null),
						null !== this._movesTail && (this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail &&
							(this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(t, n, r) {
					null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
					const o = t._prevRemoved,
						i = t._nextRemoved;
					return (
						null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
						null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
						this._insertAfter(t, n, r),
						this._addToMoves(t, r),
						t
					);
				}
				_moveAfter(t, n, r) {
					return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
				}
				_addAfter(t, n, r) {
					return (
						this._insertAfter(t, n, r),
						(this._additionsTail =
							null === this._additionsTail
								? (this._additionsHead = t)
								: (this._additionsTail._nextAdded = t)),
						t
					);
				}
				_insertAfter(t, n, r) {
					const o = null === n ? this._itHead : n._next;
					return (
						(t._next = o),
						(t._prev = n),
						null === o ? (this._itTail = t) : (o._prev = t),
						null === n ? (this._itHead = t) : (n._next = t),
						null === this._linkedRecords && (this._linkedRecords = new xy()),
						this._linkedRecords.put(t),
						(t.currentIndex = r),
						t
					);
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t));
				}
				_unlink(t) {
					null !== this._linkedRecords && this._linkedRecords.remove(t);
					const n = t._prev,
						r = t._next;
					return (
						null === n ? (this._itHead = r) : (n._next = r),
						null === r ? (this._itTail = n) : (r._prev = n),
						t
					);
				}
				_addToMoves(t, n) {
					return (
						t.previousIndex === n ||
							(this._movesTail =
								null === this._movesTail
									? (this._movesHead = t)
									: (this._movesTail._nextMoved = t)),
						t
					);
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords && (this._unlinkedRecords = new xy()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
							: ((t._prevRemoved = this._removalsTail),
							  (this._removalsTail = this._removalsTail._nextRemoved = t)),
						t
					);
				}
				_addIdentityChange(t, n) {
					return (
						(t.item = n),
						(this._identityChangesTail =
							null === this._identityChangesTail
								? (this._identityChangesHead = t)
								: (this._identityChangesTail._nextIdentityChange = t)),
						t
					);
				}
			}
			class pR {
				constructor(t, n) {
					(this.item = t),
						(this.trackById = n),
						(this.currentIndex = null),
						(this.previousIndex = null),
						(this._nextPrevious = null),
						(this._prev = null),
						(this._next = null),
						(this._prevDup = null),
						(this._nextDup = null),
						(this._prevRemoved = null),
						(this._nextRemoved = null),
						(this._nextAdded = null),
						(this._nextMoved = null),
						(this._nextIdentityChange = null);
				}
			}
			class gR {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
						: ((this._tail._nextDup = t),
						  (t._prevDup = this._tail),
						  (t._nextDup = null),
						  (this._tail = t));
				}
				get(t, n) {
					let r;
					for (r = this._head; null !== r; r = r._nextDup)
						if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
					return null;
				}
				remove(t) {
					const n = t._prevDup,
						r = t._nextDup;
					return (
						null === n ? (this._head = r) : (n._nextDup = r),
						null === r ? (this._tail = n) : (r._prevDup = n),
						null === this._head
					);
				}
			}
			class xy {
				constructor() {
					this.map = new Map();
				}
				put(t) {
					const n = t.trackById;
					let r = this.map.get(n);
					r || ((r = new gR()), this.map.set(n, r)), r.add(t);
				}
				get(t, n) {
					const o = this.map.get(t);
					return o ? o.get(t, n) : null;
				}
				remove(t) {
					const n = t.trackById;
					return this.map.get(n).remove(t) && this.map.delete(n), t;
				}
				get isEmpty() {
					return 0 === this.map.size;
				}
				clear() {
					this.map.clear();
				}
			}
			function Oy(e, t, n) {
				const r = e.previousIndex;
				if (null === r) return r;
				let o = 0;
				return n && r < n.length && (o = n[r]), r + t + o;
			}
			function Fy() {
				return new lf([new Ry()]);
			}
			let lf = (() => {
					class e {
						static #e = (this.ɵprov = M({ token: e, providedIn: "root", factory: Fy }));
						constructor(n) {
							this.factories = n;
						}
						static create(n, r) {
							if (null != r) {
								const o = r.factories.slice();
								n = n.concat(o);
							}
							return new e(n);
						}
						static extend(n) {
							return {
								provide: e,
								useFactory: (r) => e.create(n, r || Fy()),
								deps: [[e, new Na(), new Aa()]],
							};
						}
						find(n) {
							const r = this.factories.find((o) => o.supports(n));
							if (null != r) return r;
							throw new _(901, !1);
						}
					}
					return e;
				})(),
				Co = (() => {
					class e {
						static #e = (this.__NG_ELEMENT_ID__ = DR);
					}
					return e;
				})();
			function DR(e) {
				return (function _R(e, t, n) {
					if (hr(e) && !n) {
						const r = vt(e.index, t);
						return new Xi(r, r);
					}
					return 47 & e.type ? new Xi(t[De], t) : null;
				})(te(), y(), 16 == (16 & e));
			}
			let vu = (() => {
				class e {
					static #e = (this.__NG_ELEMENT_ID__ = bR);
					static #t = (this.__NG_ENV_ID__ = (n) => n);
				}
				return e;
			})();
			class ER extends vu {
				constructor(t) {
					super(), (this._lView = t);
				}
				onDestroy(t) {
					return (
						la(this._lView, t),
						() =>
							(function wl(e, t) {
								if (null === e[Vn]) return;
								const n = e[Vn].indexOf(t);
								-1 !== n && e[Vn].splice(n, 1);
							})(this._lView, t)
					);
				}
			}
			function bR() {
				return new ER(y());
			}
			const Ly = new Set();
			function Cr(e) {
				Ly.has(e) ||
					(Ly.add(e), performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
			}
			function Vy(...e) {}
			class Y {
				constructor({
					enableLongStackTrace: t = !1,
					shouldCoalesceEventChangeDetection: n = !1,
					shouldCoalesceRunChangeDetection: r = !1,
				}) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new ge(!1)),
						(this.onMicrotaskEmpty = new ge(!1)),
						(this.onStable = new ge(!1)),
						(this.onError = new ge(!1)),
						typeof Zone > "u")
					)
						throw new _(908, !1);
					Zone.assertZonePatched();
					const o = this;
					(o._nesting = 0),
						(o._outer = o._inner = Zone.current),
						Zone.TaskTrackingZoneSpec &&
							(o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
						t &&
							Zone.longStackTraceZoneSpec &&
							(o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
						(o.shouldCoalesceEventChangeDetection = !r && n),
						(o.shouldCoalesceRunChangeDetection = r),
						(o.lastRequestAnimationFrameId = -1),
						(o.nativeRequestAnimationFrame = (function NR() {
							const e = "function" == typeof K.requestAnimationFrame;
							let t = K[e ? "requestAnimationFrame" : "setTimeout"],
								n = K[e ? "cancelAnimationFrame" : "clearTimeout"];
							if (typeof Zone < "u" && t && n) {
								const r = t[Zone.__symbol__("OriginalDelegate")];
								r && (t = r);
								const o = n[Zone.__symbol__("OriginalDelegate")];
								o && (n = o);
							}
							return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
						})().nativeRequestAnimationFrame),
						(function OR(e) {
							const t = () => {
								!(function xR(e) {
									e.isCheckStableRunning ||
										-1 !== e.lastRequestAnimationFrameId ||
										((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(K, () => {
											e.fakeTopEventTask ||
												(e.fakeTopEventTask = Zone.root.scheduleEventTask(
													"fakeTopEventTask",
													() => {
														(e.lastRequestAnimationFrameId = -1),
															ff(e),
															(e.isCheckStableRunning = !0),
															df(e),
															(e.isCheckStableRunning = !1);
													},
													void 0,
													() => {},
													() => {},
												)),
												e.fakeTopEventTask.invoke();
										})),
										ff(e));
								})(e);
							};
							e._inner = e._inner.fork({
								name: "angular",
								properties: { isAngularZone: !0 },
								onInvokeTask: (n, r, o, i, s, a) => {
									if (
										(function PR(e) {
											return (
												!(!Array.isArray(e) || 1 !== e.length) &&
												!0 === e[0].data?.__ignore_ng_zone__
											);
										})(a)
									)
										return n.invokeTask(o, i, s, a);
									try {
										return jy(e), n.invokeTask(o, i, s, a);
									} finally {
										((e.shouldCoalesceEventChangeDetection && "eventTask" === i.type) ||
											e.shouldCoalesceRunChangeDetection) &&
											t(),
											By(e);
									}
								},
								onInvoke: (n, r, o, i, s, a, u) => {
									try {
										return jy(e), n.invoke(o, i, s, a, u);
									} finally {
										e.shouldCoalesceRunChangeDetection && t(), By(e);
									}
								},
								onHasTask: (n, r, o, i) => {
									n.hasTask(o, i),
										r === o &&
											("microTask" == i.change
												? ((e._hasPendingMicrotasks = i.microTask), ff(e), df(e))
												: "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask));
								},
								onHandleError: (n, r, o, i) => (
									n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1
								),
							});
						})(o);
				}
				static isInAngularZone() {
					return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
				}
				static assertInAngularZone() {
					if (!Y.isInAngularZone()) throw new _(909, !1);
				}
				static assertNotInAngularZone() {
					if (Y.isInAngularZone()) throw new _(909, !1);
				}
				run(t, n, r) {
					return this._inner.run(t, n, r);
				}
				runTask(t, n, r, o) {
					const i = this._inner,
						s = i.scheduleEventTask("NgZoneEvent: " + o, t, RR, Vy, Vy);
					try {
						return i.runTask(s, n, r);
					} finally {
						i.cancelTask(s);
					}
				}
				runGuarded(t, n, r) {
					return this._inner.runGuarded(t, n, r);
				}
				runOutsideAngular(t) {
					return this._outer.run(t);
				}
			}
			const RR = {};
			function df(e) {
				if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
					try {
						e._nesting++, e.onMicrotaskEmpty.emit(null);
					} finally {
						if ((e._nesting--, !e.hasPendingMicrotasks))
							try {
								e.runOutsideAngular(() => e.onStable.emit(null));
							} finally {
								e.isStable = !0;
							}
					}
			}
			function ff(e) {
				e.hasPendingMicrotasks = !!(
					e._hasPendingMicrotasks ||
					((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
						-1 !== e.lastRequestAnimationFrameId)
				);
			}
			function jy(e) {
				e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
			}
			function By(e) {
				e._nesting--, df(e);
			}
			class Uy {
				constructor() {
					(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new ge()),
						(this.onMicrotaskEmpty = new ge()),
						(this.onStable = new ge()),
						(this.onError = new ge());
				}
				run(t, n, r) {
					return t.apply(n, r);
				}
				runGuarded(t, n, r) {
					return t.apply(n, r);
				}
				runOutsideAngular(t) {
					return t();
				}
				runTask(t, n, r, o) {
					return t.apply(n, r);
				}
			}
			var wr = (function (e) {
				return (
					(e[(e.EarlyRead = 0)] = "EarlyRead"),
					(e[(e.Write = 1)] = "Write"),
					(e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
					(e[(e.Read = 3)] = "Read"),
					e
				);
			})(wr || {});
			const $y = { destroy() {} };
			function zy(e, t) {
				!t &&
					(function cd(e) {
						if (
							!vm() &&
							!(function kS() {
								return Kr;
							})()
						)
							throw new _(-203, !1);
					})();
				const n = t?.injector ?? w(lt);
				if (
					!(function Gn(e) {
						return "browser" === (e ?? w(lt)).get(Un);
					})(n)
				)
					return $y;
				Cr("NgAfterNextRender");
				const r = n.get(ns),
					o = (r.handler ??= new qy()),
					i = t?.phase ?? wr.MixedReadWrite,
					s = () => {
						o.unregister(u), a();
					},
					a = n.get(vu).onDestroy(s),
					u = new Gy(n, i, () => {
						s(), e();
					});
				return o.register(u), { destroy: s };
			}
			class Gy {
				constructor(t, n, r) {
					(this.phase = n),
						(this.callbackFn = r),
						(this.zone = t.get(Y)),
						(this.errorHandler = t.get(En, null, { optional: !0 }));
				}
				invoke() {
					try {
						this.zone.runOutsideAngular(this.callbackFn);
					} catch (t) {
						this.errorHandler?.handleError(t);
					}
				}
			}
			class qy {
				constructor() {
					(this.executingCallbacks = !1),
						(this.buckets = {
							[wr.EarlyRead]: new Set(),
							[wr.Write]: new Set(),
							[wr.MixedReadWrite]: new Set(),
							[wr.Read]: new Set(),
						}),
						(this.deferredCallbacks = new Set());
				}
				register(t) {
					(this.executingCallbacks ? this.deferredCallbacks : this.buckets[t.phase]).add(t);
				}
				unregister(t) {
					this.buckets[t.phase].delete(t), this.deferredCallbacks.delete(t);
				}
				execute() {
					this.executingCallbacks = !0;
					for (const t of Object.values(this.buckets)) for (const n of t) n.invoke();
					this.executingCallbacks = !1;
					for (const t of this.deferredCallbacks) this.buckets[t.phase].add(t);
					this.deferredCallbacks.clear();
				}
				destroy() {
					for (const t of Object.values(this.buckets)) t.clear();
					this.deferredCallbacks.clear();
				}
			}
			let ns = (() => {
				class e {
					constructor() {
						(this.handler = null), (this.internalCallbacks = []);
					}
					execute() {
						const n = [...this.internalCallbacks];
						this.internalCallbacks.length = 0;
						for (const r of n) r();
						this.handler?.execute();
					}
					ngOnDestroy() {
						this.handler?.destroy(), (this.handler = null), (this.internalCallbacks.length = 0);
					}
					static #e = (this.ɵprov = M({ token: e, providedIn: "root", factory: () => new e() }));
				}
				return e;
			})();
			function Du(e, t, n) {
				let r = n ? e.styles : null,
					o = n ? e.classes : null,
					i = 0;
				if (null !== t)
					for (let s = 0; s < t.length; s++) {
						const a = t[s];
						"number" == typeof a
							? (i = a)
							: 1 == i
							? (o = ul(o, a))
							: 2 == i && (r = ul(r, a + ": " + t[++s] + ";"));
					}
				n ? (e.styles = r) : (e.stylesWithoutHost = r),
					n ? (e.classes = o) : (e.classesWithoutHost = o);
			}
			class Qy extends pu {
				constructor(t) {
					super(), (this.ngModule = t);
				}
				resolveComponentFactory(t) {
					const n = U(t);
					return new is(n, this.ngModule);
				}
			}
			function Yy(e) {
				const t = [];
				for (const n in e) {
					if (!e.hasOwnProperty(n)) continue;
					const r = e[n];
					void 0 !== r && t.push({ propName: Array.isArray(r) ? r[0] : r, templateName: n });
				}
				return t;
			}
			class BR {
				constructor(t, n) {
					(this.injector = t), (this.parentInjector = n);
				}
				get(t, n, r) {
					r = Ea(r);
					const o = this.injector.get(t, uf, r);
					return o !== uf || n === uf ? o : this.parentInjector.get(t, n, r);
				}
			}
			class is extends Iy {
				get inputs() {
					const t = this.componentDef,
						n = t.inputTransforms,
						r = Yy(t.inputs);
					if (null !== n)
						for (const o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
					return r;
				}
				get outputs() {
					return Yy(this.componentDef.outputs);
				}
				constructor(t, n) {
					super(),
						(this.componentDef = t),
						(this.ngModule = n),
						(this.componentType = t.type),
						(this.selector = (function j0(e) {
							return e.map(V0).join(",");
						})(t.selectors)),
						(this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
						(this.isBoundToModule = !!n);
				}
				create(t, n, r, o) {
					let i = (o = o || this.ngModule) instanceof _t ? o : o?.injector;
					i &&
						null !== this.componentDef.getStandaloneInjector &&
						(i = this.componentDef.getStandaloneInjector(i) || i);
					const s = i ? new BR(t, i) : t,
						a = s.get(Sy, null);
					if (null === a) throw new _(407, !1);
					const d = {
							rendererFactory: a,
							sanitizer: s.get(aR, null),
							inlineEffectRunner: null,
							afterRenderEventManager: s.get(ns, null),
							changeDetectionScheduler: s.get(by, null),
						},
						f = a.createRenderer(null, this.componentDef),
						h = this.componentDef.selectors[0][0] || "div",
						p = r
							? (function XA(e, t, n, r) {
									const i = r.get(iv, !1) || n === Pt.ShadowDom,
										s = e.selectRootElement(t, i);
									return (
										(function JA(e) {
											Jv(e);
										})(s),
										s
									);
							  })(f, r, this.componentDef.encapsulation, s)
							: Ka(
									f,
									h,
									(function jR(e) {
										const t = e.toLowerCase();
										return "svg" === t ? "svg" : "math" === t ? "math" : null;
									})(h),
							  );
					let g = 512;
					this.componentDef.signals ? (g |= 4096) : this.componentDef.onPush || (g |= 16);
					let m = null;
					null !== p && (m = Xl(p, s, !0));
					const D = qd(0, null, null, 1, 0, null, null, null, null, null, null),
						v = iu(null, D, null, g, null, null, d, f, s, null, m);
					let I, A;
					Tl(v);
					try {
						const F = this.componentDef;
						let re,
							gn = null;
						F.findHostDirectiveDefs
							? ((re = []), (gn = new Map()), F.findHostDirectiveDefs(F, re, gn), re.push(F))
							: (re = [F]);
						const Wc = (function $R(e, t) {
								const n = e[E],
									r = L;
								return (e[r] = t), yo(n, r, 2, "#host", null);
							})(v, p),
							wH = (function HR(e, t, n, r, o, i, s) {
								const a = o[E];
								!(function zR(e, t, n, r) {
									for (const o of e) t.mergedAttrs = Ci(t.mergedAttrs, o.hostAttrs);
									null !== t.mergedAttrs && (Du(t, t.mergedAttrs, !0), null !== n && qv(r, n, t));
								})(r, e, t, s);
								let u = null;
								null !== t && (u = Xl(t, o[We]));
								const c = i.rendererFactory.createRenderer(t, n);
								let l = 16;
								n.signals ? (l = 4096) : n.onPush && (l = 64);
								const d = iu(o, Xv(n), null, l, o[e.index], e, i, c, null, null, u);
								return a.firstCreatePass && Zd(a, e, r.length - 1), su(o, d), (o[e.index] = d);
							})(Wc, p, F, re, v, d, f);
						(A = Si(D, L)),
							p &&
								(function qR(e, t, n, r) {
									if (r) dl(e, n, ["ng-version", "17.2.2"]);
									else {
										const { attrs: o, classes: i } = (function B0(e) {
											const t = [],
												n = [];
											let r = 1,
												o = 2;
											for (; r < e.length; ) {
												let i = e[r];
												if ("string" == typeof i)
													2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
												else {
													if (!Ft(o)) break;
													o = i;
												}
												r++;
											}
											return { attrs: t, classes: n };
										})(t.selectors[0]);
										o && dl(e, n, o), i && i.length > 0 && Gv(e, n, i.join(" "));
									}
								})(f, F, p, r),
							void 0 !== n &&
								(function WR(e, t, n) {
									const r = (e.projection = []);
									for (let o = 0; o < t.length; o++) {
										const i = n[o];
										r.push(null != i ? Array.from(i) : null);
									}
								})(A, this.ngContentSelectors, n),
							(I = (function GR(e, t, n, r, o, i) {
								const s = te(),
									a = o[E],
									u = tt(s, o);
								ty(a, o, s, n, null, r);
								for (let l = 0; l < n.length; l++) Xe(Dr(o, a, s.directiveStart + l, s), o);
								ny(a, o, s), u && Xe(u, o);
								const c = Dr(o, a, s.directiveStart + s.componentOffset, s);
								if (((e[ue] = o[ue] = c), null !== i)) for (const l of i) l(c, t);
								return Hd(a, s, o), c;
							})(wH, F, re, gn, v, [ZR])),
							Jd(D, v, null);
					} finally {
						Al();
					}
					return new UR(this.componentType, I, Yr(A, v), v, A);
				}
			}
			class UR extends rR {
				constructor(t, n, r, o, i) {
					super(),
						(this.location = r),
						(this._rootLView = o),
						(this._tNode = i),
						(this.previousInputValues = null),
						(this.instance = n),
						(this.hostView = this.changeDetectorRef = new Xi(o, void 0, !1)),
						(this.componentType = t);
				}
				setInput(t, n) {
					const r = this._tNode.inputs;
					let o;
					if (null !== r && (o = r[t])) {
						if (
							((this.previousInputValues ??= new Map()),
							this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
						)
							return;
						const i = this._rootLView;
						Xd(i[E], i, o, t, n), this.previousInputValues.set(t, n), Yi(vt(this._tNode.index, i));
					}
				}
				get injector() {
					return new Fe(this._tNode, this._rootLView);
				}
				destroy() {
					this.hostView.destroy();
				}
				onDestroy(t) {
					this.hostView.onDestroy(t);
				}
			}
			function ZR() {
				const e = te();
				La(y()[E], e);
			}
			let Ut = (() => {
				class e {
					static #e = (this.__NG_ELEMENT_ID__ = QR);
				}
				return e;
			})();
			function QR() {
				return (function Ky(e, t) {
					let n;
					const r = t[e.index];
					return (
						Qe(r) ? (n = r) : ((n = ry(r, t, null, e)), (t[e.index] = n), su(t, n)),
						eD(n, t, e, r),
						new Xy(n, e, t)
					);
				})(te(), y());
			}
			const YR = Ut,
				Xy = class extends YR {
					constructor(t, n, r) {
						super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r);
					}
					get element() {
						return Yr(this._hostTNode, this._hostLView);
					}
					get injector() {
						return new Fe(this._hostTNode, this._hostLView);
					}
					get parentInjector() {
						const t = $a(this._hostTNode, this._hostLView);
						if (pd(t)) {
							const n = ji(t, this._hostLView),
								r = Vi(t);
							return new Fe(n[E].data[r + 8], n);
						}
						return new Fe(null, this._hostLView);
					}
					clear() {
						for (; this.length > 0; ) this.remove(this.length - 1);
					}
					get(t) {
						const n = Jy(this._lContainer);
						return (null !== n && n[t]) || null;
					}
					get length() {
						return this._lContainer.length - Ee;
					}
					createEmbeddedView(t, n, r) {
						let o, i;
						"number" == typeof r ? (o = r) : null != r && ((o = r.index), (i = r.injector));
						const a = t.createEmbeddedViewImpl(n || {}, i, null);
						return this.insertImpl(a, o, Do(this._hostTNode, null)), a;
					}
					createComponent(t, n, r, o, i) {
						const s =
							t &&
							!(function ki(e) {
								return "function" == typeof e;
							})(t);
						let a;
						if (s) a = n;
						else {
							const p = n || {};
							(a = p.index),
								(r = p.injector),
								(o = p.projectableNodes),
								(i = p.environmentInjector || p.ngModuleRef);
						}
						const u = s ? t : new is(U(t)),
							c = r || this.parentInjector;
						if (!i && null == u.ngModule) {
							const g = (s ? c : this.parentInjector).get(_t, null);
							g && (i = g);
						}
						U(u.componentType ?? {});
						const h = u.create(c, o, null, i);
						return this.insertImpl(h.hostView, a, Do(this._hostTNode, null)), h;
					}
					insert(t, n) {
						return this.insertImpl(t, n, !0);
					}
					insertImpl(t, n, r) {
						const o = t._lView;
						if (
							(function X0(e) {
								return Qe(e[we]);
							})(o)
						) {
							const a = this.indexOf(t);
							if (-1 !== a) this.detach(a);
							else {
								const u = o[we],
									c = new Xy(u, u[qe], u[we]);
								c.detach(c.indexOf(t));
							}
						}
						const i = this._adjustIndex(n),
							s = this._lContainer;
						return Zi(s, o, i, r), t.attachToViewContainerRef(), am(gf(s), i, t), t;
					}
					move(t, n) {
						return this.insert(t, n);
					}
					indexOf(t) {
						const n = Jy(this._lContainer);
						return null !== n ? n.indexOf(t) : -1;
					}
					remove(t) {
						const n = this._adjustIndex(t, -1),
							r = zi(this._lContainer, n);
						r && (ha(gf(this._lContainer), n), eu(r[E], r));
					}
					detach(t) {
						const n = this._adjustIndex(t, -1),
							r = zi(this._lContainer, n);
						return r && null != ha(gf(this._lContainer), n) ? new Xi(r) : null;
					}
					_adjustIndex(t, n = 0) {
						return t ?? this.length + n;
					}
				};
			function Jy(e) {
				return e[8];
			}
			function gf(e) {
				return e[8] || (e[8] = []);
			}
			let eD = function nD(e, t, n, r) {
					if (e[Xt]) return;
					let o;
					(o =
						8 & n.type
							? oe(r)
							: (function XR(e, t) {
									const n = e[k],
										r = n.createComment(""),
										o = tt(t, e);
									return (
										_r(
											n,
											tu(n, o),
											r,
											(function zA(e, t) {
												return e.nextSibling(t);
											})(n, o),
											!1,
										),
										r
									);
							  })(t, n)),
						(e[Xt] = o);
				},
				mf = () => !1;
			class Er {}
			class ID {}
			class If extends Er {
				constructor(t, n, r) {
					super(),
						(this._parent = n),
						(this._bootstrapComponents = []),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new Qy(this));
					const o = Ge(t);
					(this._bootstrapComponents = Ct(o.bootstrap)),
						(this._r3Injector = tv(
							t,
							n,
							[
								{ provide: Er, useValue: this },
								{ provide: pu, useValue: this.componentFactoryResolver },
								...r,
							],
							xe(t),
							new Set(["environment"]),
						)),
						this._r3Injector.resolveInjectorInitializers(),
						(this.instance = this._r3Injector.get(t));
				}
				get injector() {
					return this._r3Injector;
				}
				destroy() {
					const t = this._r3Injector;
					!t.destroyed && t.destroy(),
						this.destroyCbs.forEach((n) => n()),
						(this.destroyCbs = null);
				}
				onDestroy(t) {
					this.destroyCbs.push(t);
				}
			}
			class Mf extends ID {
				constructor(t) {
					super(), (this.moduleType = t);
				}
				create(t) {
					return new If(this.moduleType, t, []);
				}
			}
			class MD extends Er {
				constructor(t) {
					super(), (this.componentFactoryResolver = new Qy(this)), (this.instance = null);
					const n = new ao(
						[
							...t.providers,
							{ provide: Er, useValue: this },
							{ provide: pu, useValue: this.componentFactoryResolver },
						],
						t.parent || Fa(),
						t.debugName,
						new Set(["environment"]),
					);
					(this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers();
				}
				destroy() {
					this.injector.destroy();
				}
				onDestroy(t) {
					this.injector.onDestroy(t);
				}
			}
			function Sf(e, t, n = null) {
				return new MD({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 })
					.injector;
			}
			let br = (() => {
				class e {
					constructor() {
						(this.taskId = 0), (this.pendingTasks = new Set()), (this.hasPendingTasks = new bt(!1));
					}
					get _hasPendingTasks() {
						return this.hasPendingTasks.value;
					}
					add() {
						this._hasPendingTasks || this.hasPendingTasks.next(!0);
						const n = this.taskId++;
						return this.pendingTasks.add(n), n;
					}
					remove(n) {
						this.pendingTasks.delete(n),
							0 === this.pendingTasks.size &&
								this._hasPendingTasks &&
								this.hasPendingTasks.next(!1);
					}
					ngOnDestroy() {
						this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			function rn(e, t, n) {
				return (e[t] = n);
			}
			function be(e, t, n) {
				return !Object.is(e[t], n) && ((e[t] = n), !0);
			}
			function Ir(e, t, n, r) {
				const o = be(e, t, n);
				return be(e, t + 1, r) || o;
			}
			function ht(e, t, n, r, o, i, s, a) {
				const u = y(),
					c = H(),
					l = e + L,
					d = c.firstCreatePass
						? (function Ax(e, t, n, r, o, i, s, a, u) {
								const c = t.consts,
									l = yo(t, e, 4, s || null, Jt(c, a));
								Wd(t, n, l, Jt(c, u)), La(t, l);
								const d = (l.tView = qd(
									2,
									l,
									r,
									o,
									i,
									t.directiveRegistry,
									t.pipeRegistry,
									null,
									t.schemas,
									c,
									null,
								));
								return (
									null !== t.queries &&
										(t.queries.template(t, l), (d.queries = t.queries.embeddedTView(l))),
									l
								);
						  })(l, c, u, t, n, r, o, i, s)
						: c.data[l];
				Kt(d, !1);
				const f = SD(c, u, d, e);
				fa() && nu(c, u, f, d), Xe(f, u);
				const h = ry(f, u, f, d);
				return (
					(u[l] = h),
					su(u, h),
					(function tD(e, t, n) {
						return mf(e, t, n);
					})(h, d, u),
					ca(d) && zd(c, u, d),
					null != s && Gd(u, d, a),
					ht
				);
			}
			let SD = function TD(e, t, n, r) {
				return jn(!0), t[k].createComment("");
			};
			function No(e, t, n, r) {
				return be(e, jt(), n) ? t + V(n) + r : j;
			}
			function Ro(e, t, n, r, o, i) {
				const a = Ir(
					e,
					(function Cn() {
						return x.lFrame.bindingIndex;
					})(),
					n,
					o,
				);
				return (
					(function wn(e) {
						const t = x.lFrame,
							n = t.bindingIndex;
						return (t.bindingIndex = t.bindingIndex + e), n;
					})(2),
					a ? t + V(n) + r + V(o) + i : j
				);
			}
			function je(e, t, n) {
				const r = y();
				return be(r, jt(), t) && ft(H(), ce(), r, e, t, r[k], n, !1), je;
			}
			function Bf(e, t, n, r, o) {
				const s = o ? "class" : "style";
				Xd(e, n, t.inputs[s], s, r);
			}
			function q(e, t, n, r) {
				const o = y(),
					i = H(),
					s = L + e,
					a = o[k],
					u = i.firstCreatePass
						? (function JO(e, t, n, r, o, i) {
								const s = t.consts,
									u = yo(t, e, 2, r, Jt(s, o));
								return (
									Wd(t, n, u, Jt(s, i)),
									null !== u.attrs && Du(u, u.attrs, !1),
									null !== u.mergedAttrs && Du(u, u.mergedAttrs, !0),
									null !== t.queries && t.queries.elementStart(t, u),
									u
								);
						  })(s, i, o, t, n, r)
						: i.data[s],
					c = w_(i, o, u, a, t, e);
				o[s] = c;
				const l = ca(u);
				return (
					Kt(u, !0),
					qv(a, c, u),
					32 != (32 & u.flags) && fa() && nu(i, o, c, u),
					0 ===
						(function K0() {
							return x.lFrame.elementDepthCount;
						})() && Xe(c, o),
					(function eS() {
						x.lFrame.elementDepthCount++;
					})(),
					l && (zd(i, o, u), Hd(i, u, o)),
					null !== r && Gd(o, u),
					q
				);
			}
			function Z() {
				let e = te();
				El() ? bl() : ((e = e.parent), Kt(e, !1));
				const t = e;
				(function nS(e) {
					return x.skipHydrationRootTNode === e;
				})(t) &&
					(function sS() {
						x.skipHydrationRootTNode = null;
					})(),
					(function tS() {
						x.lFrame.elementDepthCount--;
					})();
				const n = H();
				return (
					n.firstCreatePass && (La(n, e), pl(e) && n.queries.elementEnd(e)),
					null != t.classesWithoutHost &&
						(function IT(e) {
							return 0 != (8 & e.flags);
						})(t) &&
						Bf(n, t, y(), t.classesWithoutHost, !0),
					null != t.stylesWithoutHost &&
						(function MT(e) {
							return 0 != (16 & e.flags);
						})(t) &&
						Bf(n, t, y(), t.stylesWithoutHost, !1),
					Z
				);
			}
			function Tt(e, t, n, r) {
				return q(e, t, n, r), Z(), Tt;
			}
			let w_ = (e, t, n, r, o, i) => (
				jn(!0),
				Ka(
					r,
					o,
					(function om() {
						return x.lFrame.currentNamespace;
					})(),
				)
			);
			function jo(e, t, n) {
				const r = y(),
					o = H(),
					i = e + L,
					s = o.firstCreatePass
						? (function tP(e, t, n, r, o) {
								const i = t.consts,
									s = Jt(i, r),
									a = yo(t, e, 8, "ng-container", s);
								return (
									null !== s && Du(a, s, !0),
									Wd(t, n, a, Jt(i, o)),
									null !== t.queries && t.queries.elementStart(t, a),
									a
								);
						  })(i, o, r, t, n)
						: o.data[i];
				Kt(s, !0);
				const a = b_(o, r, s, e);
				return (
					(r[i] = a),
					fa() && nu(o, r, a, s),
					Xe(a, r),
					ca(s) && (zd(o, r, s), Hd(o, s, r)),
					null != n && Gd(r, s),
					jo
				);
			}
			function Bo() {
				let e = te();
				const t = H();
				return (
					El() ? bl() : ((e = e.parent), Kt(e, !1)),
					t.firstCreatePass && (La(t, e), pl(e) && t.queries.elementEnd(e)),
					Bo
				);
			}
			let b_ = (e, t, n, r) => (jn(!0), kd(t[k], ""));
			const Tr = void 0;
			var iP = [
				"en",
				[["a", "p"], ["AM", "PM"], Tr],
				[["AM", "PM"], Tr, Tr],
				[
					["S", "M", "T", "W", "T", "F", "S"],
					["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				],
				Tr,
				[
					["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
					["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					[
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
					],
				],
				Tr,
				[
					["B", "A"],
					["BC", "AD"],
					["Before Christ", "Anno Domini"],
				],
				0,
				[6, 0],
				["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
				["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
				["{1}, {0}", Tr, "{1} 'at' {0}", Tr],
				[".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"],
				["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
				"USD",
				"$",
				"US Dollar",
				{},
				"ltr",
				function oP(e) {
					const n = Math.floor(Math.abs(e)),
						r = e.toString().replace(/^[^.]*\.?/, "").length;
					return 1 === n && 0 === r ? 1 : 5;
				},
			];
			let Uo = {};
			function rt(e) {
				const t = (function sP(e) {
					return e.toLowerCase().replace(/_/g, "-");
				})(e);
				let n = A_(t);
				if (n) return n;
				const r = t.split("-")[0];
				if (((n = A_(r)), n)) return n;
				if ("en" === r) return iP;
				throw new _(701, !1);
			}
			function A_(e) {
				return (
					e in Uo || (Uo[e] = K.ng && K.ng.common && K.ng.common.locales && K.ng.common.locales[e]),
					Uo[e]
				);
			}
			var de = (function (e) {
				return (
					(e[(e.LocaleId = 0)] = "LocaleId"),
					(e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
					(e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
					(e[(e.DaysFormat = 3)] = "DaysFormat"),
					(e[(e.DaysStandalone = 4)] = "DaysStandalone"),
					(e[(e.MonthsFormat = 5)] = "MonthsFormat"),
					(e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
					(e[(e.Eras = 7)] = "Eras"),
					(e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
					(e[(e.WeekendRange = 9)] = "WeekendRange"),
					(e[(e.DateFormat = 10)] = "DateFormat"),
					(e[(e.TimeFormat = 11)] = "TimeFormat"),
					(e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
					(e[(e.NumberSymbols = 13)] = "NumberSymbols"),
					(e[(e.NumberFormats = 14)] = "NumberFormats"),
					(e[(e.CurrencyCode = 15)] = "CurrencyCode"),
					(e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
					(e[(e.CurrencyName = 17)] = "CurrencyName"),
					(e[(e.Currencies = 18)] = "Currencies"),
					(e[(e.Directionality = 19)] = "Directionality"),
					(e[(e.PluralCase = 20)] = "PluralCase"),
					(e[(e.ExtraData = 21)] = "ExtraData"),
					e
				);
			})(de || {});
			const $o = "en-US";
			let N_ = $o;
			function Be(e, t, n, r) {
				const o = y(),
					i = H(),
					s = te();
				return Zf(i, o, o[k], s, e, t, r), Be;
			}
			function Zf(e, t, n, r, o, i, s) {
				const a = ca(r),
					c =
						e.firstCreatePass &&
						(function sy(e) {
							return e.cleanup || (e.cleanup = []);
						})(e),
					l = t[ue],
					d = (function iy(e) {
						return e[$r] || (e[$r] = []);
					})(t);
				let f = !0;
				if (3 & r.type || s) {
					const g = tt(r, t),
						m = s ? s(g) : g,
						D = d.length,
						v = s ? (A) => s(oe(A[r.index])) : r.index;
					let I = null;
					if (
						(!s &&
							a &&
							(I = (function eF(e, t, n, r) {
								const o = e.cleanup;
								if (null != o)
									for (let i = 0; i < o.length - 1; i += 2) {
										const s = o[i];
										if (s === n && o[i + 1] === r) {
											const a = t[$r],
												u = o[i + 2];
											return a.length > u ? a[u] : null;
										}
										"string" == typeof s && (i += 2);
									}
								return null;
							})(e, t, o, r.index)),
						null !== I)
					)
						((I.__ngLastListenerFn__ || I).__ngNextListenerFn__ = i),
							(I.__ngLastListenerFn__ = i),
							(f = !1);
					else {
						i = rC(r, t, l, i, !1);
						const A = n.listen(m, o, i);
						d.push(i, A), c && c.push(o, v, D, D + 1);
					}
				} else i = rC(r, t, l, i, !1);
				const h = r.outputs;
				let p;
				if (f && null !== h && (p = h[o])) {
					const g = p.length;
					if (g)
						for (let m = 0; m < g; m += 2) {
							const F = t[p[m]][p[m + 1]].subscribe(i),
								re = d.length;
							d.push(i, F),
								c && c.push(o, r.index, re, "function" == typeof F ? re + 1 : -(re + 1));
						}
				}
			}
			function nC(e, t, n, r) {
				try {
					return en(6, t, n), !1 !== n(r);
				} catch (o) {
					return au(e, o), !1;
				} finally {
					en(7, t, n);
				}
			}
			function rC(e, t, n, r, o) {
				return function i(s) {
					if (s === Function) return r;
					Yi(e.componentOffset > -1 ? vt(e.index, t) : t);
					let u = nC(t, n, r, s),
						c = i.__ngNextListenerFn__;
					for (; c; ) (u = nC(t, n, c, s) && u), (c = c.__ngNextListenerFn__);
					return o && !1 === u && s.preventDefault(), u;
				};
			}
			function un(e = 1) {
				return (function fS(e) {
					return (x.lFrame.contextLView = (function qg(e, t) {
						for (; e > 0; ) (t = t[Hr]), e--;
						return t;
					})(e, x.lFrame.contextLView))[ue];
				})(e);
			}
			function tF(e, t) {
				let n = null;
				const r = (function P0(e) {
					const t = e.attrs;
					if (null != t) {
						const n = t.indexOf(5);
						if (!(1 & n)) return t[n + 1];
					}
					return null;
				})(e);
				for (let o = 0; o < t.length; o++) {
					const i = t[o];
					if ("*" !== i) {
						if (null === r ? xg(e, i, !0) : L0(r, i)) return o;
					} else n = o;
				}
				return n;
			}
			function ku(e, t, n, r, o) {
				const i = y(),
					s = No(i, t, n, r);
				return s !== j && ft(H(), ce(), i, e, s, i[k], o, !1), ku;
			}
			function He(e, t = "") {
				const n = y(),
					r = H(),
					o = e + L,
					i = r.firstCreatePass ? yo(r, o, 1, t, null) : r.data[o],
					s = TC(r, n, i, t, e);
				(n[o] = s), fa() && nu(r, n, s, i), Kt(i, !1);
			}
			let TC = (e, t, n, r, o) => (
				jn(!0),
				(function Ja(e, t) {
					return e.createText(t);
				})(t[k], r)
			);
			function Lu(e) {
				return Ho("", e, ""), Lu;
			}
			function Ho(e, t, n) {
				const r = y(),
					o = No(r, e, t, n);
				return o !== j && In(r, Ye(), o), Ho;
			}
			function Vu(e, t, n, r, o) {
				const i = y(),
					s = Ro(i, e, t, n, r, o);
				return s !== j && In(i, Ye(), s), Vu;
			}
			function Ar(e, t, n) {
				Ay(t) && (t = t());
				const r = y();
				return be(r, jt(), t) && ft(H(), ce(), r, e, t, r[k], n, !1), Ar;
			}
			function zo(e, t) {
				const n = Ay(e);
				return n && e.set(t), n;
			}
			function Nr(e, t) {
				const n = y(),
					r = H(),
					o = te();
				return Zf(r, n, n[k], o, e, t), Nr;
			}
			let wF = (() => {
				class e {
					constructor(n) {
						(this._injector = n), (this.cachedInjectors = new Map());
					}
					getOrCreateStandaloneInjector(n) {
						if (!n.standalone) return null;
						if (!this.cachedInjectors.has(n)) {
							const r = Tm(0, n.type),
								o = r.length > 0 ? Sf([r], this._injector, `Standalone[${n.type.name}]`) : null;
							this.cachedInjectors.set(n, o);
						}
						return this.cachedInjectors.get(n);
					}
					ngOnDestroy() {
						try {
							for (const n of this.cachedInjectors.values()) null !== n && n.destroy();
						} finally {
							this.cachedInjectors.clear();
						}
					}
					static #e = (this.ɵprov = M({
						token: e,
						providedIn: "environment",
						factory: () => new e(S(_t)),
					}));
				}
				return e;
			})();
			function LC(e) {
				Cr("NgStandalone"),
					(e.getStandaloneInjector = (t) => t.get(wF).getOrCreateStandaloneInjector(e));
			}
			function vs(e, t) {
				const n = e[t];
				return n === j ? void 0 : n;
			}
			function ZC(e, t, n, r, o, i, s, a) {
				const u = t + n;
				return (function Eu(e, t, n, r, o) {
					const i = Ir(e, t, n, r);
					return be(e, t + 2, o) || i;
				})(e, u, o, i, s)
					? rn(e, u + 3, a ? r.call(a, o, i, s) : r(o, i, s))
					: vs(e, u + 3);
			}
			function QC(e, t, n, r, o, i, s, a, u) {
				const c = t + n;
				return (function Mt(e, t, n, r, o, i) {
					const s = Ir(e, t, n, r);
					return Ir(e, t + 2, o, i) || s;
				})(e, c, o, i, s, a)
					? rn(e, c + 4, u ? r.call(u, o, i, s, a) : r(o, i, s, a))
					: vs(e, c + 4);
			}
			function Xn(e, t) {
				const n = H();
				let r;
				const o = e + L;
				n.firstCreatePass
					? ((r = (function $F(e, t) {
							if (t)
								for (let n = t.length - 1; n >= 0; n--) {
									const r = t[n];
									if (e === r.name) return r;
								}
					  })(t, n.pipeRegistry)),
					  (n.data[o] = r),
					  r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
					: (r = n.data[o]);
				const i = r.factory || (r.factory = mr(r.type)),
					a = ct(C);
				try {
					const u = Ba(!1),
						c = i();
					return (
						Ba(u),
						(function sF(e, t, n, r) {
							n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)), (t[n] = r);
						})(n, y(), o, c),
						c
					);
				} finally {
					ct(a);
				}
			}
			function Bu(e, t, n) {
				const r = e + L,
					o = y(),
					i = qr(o, r);
				return ys(o, r)
					? (function qC(e, t, n, r, o, i) {
							const s = t + n;
							return be(e, s, o) ? rn(e, s + 1, i ? r.call(i, o) : r(o)) : vs(e, s + 1);
					  })(o, nt(), t, i.transform, n, i)
					: i.transform(n);
			}
			function eh(e, t, n, r) {
				const o = e + L,
					i = y(),
					s = qr(i, o);
				return ys(i, o)
					? (function WC(e, t, n, r, o, i, s) {
							const a = t + n;
							return Ir(e, a, o, i) ? rn(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : vs(e, a + 2);
					  })(i, nt(), t, s.transform, n, r, s)
					: s.transform(n, r);
			}
			function ys(e, t) {
				return e[E].data[t].pure;
			}
			function KC(e, t) {
				return cu(e, t);
			}
			let gw = (() => {
				class e {
					log(n) {
						console.log(n);
					}
					warn(n) {
						console.warn(n);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" }));
				}
				return e;
			})();
			const _w = new b(""),
				Hu = new b("");
			let uh,
				sh = (() => {
					class e {
						constructor(n, r, o) {
							(this._ngZone = n),
								(this.registry = r),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								uh ||
									((function kk(e) {
										uh = e;
									})(o),
									o.addToWindow(r)),
								this._watchAngularEvents(),
								n.run(() => {
									this.taskTrackingZone =
										typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									this._isZoneStable = !1;
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											Y.assertNotInAngularZone(),
												queueMicrotask(() => {
													(this._isZoneStable = !0), this._runCallbacksIfReady();
												});
										},
									});
								});
						}
						increasePendingRequestCount() {
							return (this._pendingCount += 1), this._pendingCount;
						}
						decreasePendingRequestCount() {
							if (((this._pendingCount -= 1), this._pendingCount < 0))
								throw new Error("pending async requests below zero");
							return this._runCallbacksIfReady(), this._pendingCount;
						}
						isStable() {
							return (
								this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
							);
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								queueMicrotask(() => {
									for (; 0 !== this._callbacks.length; ) {
										let n = this._callbacks.pop();
										clearTimeout(n.timeoutId), n.doneCb();
									}
								});
							else {
								let n = this.getPendingTasks();
								this._callbacks = this._callbacks.filter(
									(r) => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1),
								);
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone
								? this.taskTrackingZone.macroTasks.map((n) => ({
										source: n.source,
										creationLocation: n.creationLocation,
										data: n.data,
								  }))
								: [];
						}
						addCallback(n, r, o) {
							let i = -1;
							r &&
								r > 0 &&
								(i = setTimeout(() => {
									(this._callbacks = this._callbacks.filter((s) => s.timeoutId !== i)), n();
								}, r)),
								this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
						}
						whenStable(n, r, o) {
							if (o && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
								);
							this.addCallback(n, r, o), this._runCallbacksIfReady();
						}
						getPendingRequestCount() {
							return this._pendingCount;
						}
						registerApplication(n) {
							this.registry.registerApplication(n, this);
						}
						unregisterApplication(n) {
							this.registry.unregisterApplication(n);
						}
						findProviders(n, r, o) {
							return [];
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(Y), S(ah), S(Hu));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
					}
					return e;
				})(),
				ah = (() => {
					class e {
						constructor() {
							this._applications = new Map();
						}
						registerApplication(n, r) {
							this._applications.set(n, r);
						}
						unregisterApplication(n) {
							this._applications.delete(n);
						}
						unregisterAllApplications() {
							this._applications.clear();
						}
						getTestability(n) {
							return this._applications.get(n) || null;
						}
						getAllTestabilities() {
							return Array.from(this._applications.values());
						}
						getAllRootElements() {
							return Array.from(this._applications.keys());
						}
						findTestabilityInTree(n, r = !0) {
							return uh?.findTestabilityInTree(this, n, r) ?? null;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" }));
					}
					return e;
				})();
			function ws(e) {
				return !!e && "function" == typeof e.then;
			}
			function Cw(e) {
				return !!e && "function" == typeof e.subscribe;
			}
			const ch = new b("");
			let lh = (() => {
				class e {
					constructor() {
						(this.initialized = !1),
							(this.done = !1),
							(this.donePromise = new Promise((n, r) => {
								(this.resolve = n), (this.reject = r);
							})),
							(this.appInits = w(ch, { optional: !0 }) ?? []);
					}
					runInitializers() {
						if (this.initialized) return;
						const n = [];
						for (const o of this.appInits) {
							const i = o();
							if (ws(i)) n.push(i);
							else if (Cw(i)) {
								const s = new Promise((a, u) => {
									i.subscribe({ complete: a, error: u });
								});
								n.push(s);
							}
						}
						const r = () => {
							(this.done = !0), this.resolve();
						};
						Promise.all(n)
							.then(() => {
								r();
							})
							.catch((o) => {
								this.reject(o);
							}),
							0 === n.length && r(),
							(this.initialized = !0);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			const dh = new b("");
			function bw(e, t) {
				return Array.isArray(t) ? t.reduce(bw, e) : { ...e, ...t };
			}
			let Rr = (() => {
				class e {
					constructor() {
						(this._bootstrapListeners = []),
							(this._runningTick = !1),
							(this._destroyed = !1),
							(this._destroyListeners = []),
							(this._views = []),
							(this.internalErrorHandler = w(rv)),
							(this.afterRenderEffectManager = w(ns)),
							(this.componentTypes = []),
							(this.components = []),
							(this.isStable = w(br).hasPendingTasks.pipe(z((n) => !n))),
							(this._injector = w(_t));
					}
					get destroyed() {
						return this._destroyed;
					}
					get injector() {
						return this._injector;
					}
					bootstrap(n, r) {
						const o = n instanceof Iy;
						if (!this._injector.get(lh).done)
							throw (
								(!o &&
									(function Ln(e) {
										const t = U(e) || Oe(e) || $e(e);
										return null !== t && t.standalone;
									})(n),
								new _(405, !1))
							);
						let s;
						(s = o ? n : this._injector.get(pu).resolveComponentFactory(n)),
							this.componentTypes.push(s.componentType);
						const a = (function Lk(e) {
								return e.isBoundToModule;
							})(s)
								? void 0
								: this._injector.get(Er),
							c = s.create(lt.NULL, [], r || s.selector, a),
							l = c.location.nativeElement,
							d = c.injector.get(_w, null);
						return (
							d?.registerApplication(l),
							c.onDestroy(() => {
								this.detachView(c.hostView), zu(this.components, c), d?.unregisterApplication(l);
							}),
							this._loadComponent(c),
							c
						);
					}
					tick() {
						if (this._runningTick) throw new _(101, !1);
						try {
							(this._runningTick = !0), this.detectChangesInAttachedViews();
						} catch (n) {
							this.internalErrorHandler(n);
						} finally {
							this._runningTick = !1;
						}
					}
					detectChangesInAttachedViews() {
						let n = 0;
						do {
							if (100 === n) throw new _(103, !1);
							const r = 0 === n;
							for (let { _lView: o, notifyErrorHandler: i } of this._views)
								(!r && !Iw(o)) || this.detectChangesInView(o, i, r);
							this.afterRenderEffectManager.execute(), n++;
						} while (this._views.some(({ _lView: r }) => Iw(r)));
					}
					detectChangesInView(n, r, o) {
						let i;
						o ? ((i = 0), (n[T] |= 1024)) : (i = 64 & n[T] ? 0 : 1), uu(n, r, i);
					}
					attachView(n) {
						const r = n;
						this._views.push(r), r.attachToAppRef(this);
					}
					detachView(n) {
						const r = n;
						zu(this._views, r), r.detachFromAppRef();
					}
					_loadComponent(n) {
						this.attachView(n.hostView), this.tick(), this.components.push(n);
						const r = this._injector.get(dh, []);
						[...this._bootstrapListeners, ...r].forEach((o) => o(n));
					}
					ngOnDestroy() {
						if (!this._destroyed)
							try {
								this._destroyListeners.forEach((n) => n()),
									this._views.slice().forEach((n) => n.destroy());
							} finally {
								(this._destroyed = !0),
									(this._views = []),
									(this._bootstrapListeners = []),
									(this._destroyListeners = []);
							}
					}
					onDestroy(n) {
						return this._destroyListeners.push(n), () => zu(this._destroyListeners, n);
					}
					destroy() {
						if (this._destroyed) throw new _(406, !1);
						const n = this._injector;
						n.destroy && !n.destroyed && n.destroy();
					}
					get viewCount() {
						return this._views.length;
					}
					warnIfDestroyed() {}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			function zu(e, t) {
				const n = e.indexOf(t);
				n > -1 && e.splice(n, 1);
			}
			function Iw(e) {
				return _l(e);
			}
			class jk {
				constructor(t, n) {
					(this.ngModuleFactory = t), (this.componentFactories = n);
				}
			}
			let Mw = (() => {
					class e {
						compileModuleSync(n) {
							return new Mf(n);
						}
						compileModuleAsync(n) {
							return Promise.resolve(this.compileModuleSync(n));
						}
						compileModuleAndAllComponentsSync(n) {
							const r = this.compileModuleSync(n),
								i = Ct(Ge(n).declarations).reduce((s, a) => {
									const u = U(a);
									return u && s.push(new is(u)), s;
								}, []);
							return new jk(r, i);
						}
						compileModuleAndAllComponentsAsync(n) {
							return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
						}
						clearCache() {}
						clearCacheFor(n) {}
						getModuleId(n) {}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})(),
				$k = (() => {
					class e {
						constructor() {
							(this.zone = w(Y)), (this.applicationRef = w(Rr));
						}
						initialize() {
							this._onMicrotaskEmptySubscription ||
								(this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
									next: () => {
										this.zone.run(() => {
											this.applicationRef.tick();
										});
									},
								}));
						}
						ngOnDestroy() {
							this._onMicrotaskEmptySubscription?.unsubscribe();
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			function Hk() {
				const e = w(Y),
					t = w(En);
				return (n) => e.runOutsideAngular(() => t.handleError(n));
			}
			let Gk = (() => {
				class e {
					constructor() {
						(this.subscription = new at()),
							(this.initialized = !1),
							(this.zone = w(Y)),
							(this.pendingTasks = w(br));
					}
					initialize() {
						if (this.initialized) return;
						this.initialized = !0;
						let n = null;
						!this.zone.isStable &&
							!this.zone.hasPendingMacrotasks &&
							!this.zone.hasPendingMicrotasks &&
							(n = this.pendingTasks.add()),
							this.zone.runOutsideAngular(() => {
								this.subscription.add(
									this.zone.onStable.subscribe(() => {
										Y.assertNotInAngularZone(),
											queueMicrotask(() => {
												null !== n &&
													!this.zone.hasPendingMacrotasks &&
													!this.zone.hasPendingMicrotasks &&
													(this.pendingTasks.remove(n), (n = null));
											});
									}),
								);
							}),
							this.subscription.add(
								this.zone.onUnstable.subscribe(() => {
									Y.assertInAngularZone(), (n ??= this.pendingTasks.add());
								}),
							);
					}
					ngOnDestroy() {
						this.subscription.unsubscribe();
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			const Tn = new b("", {
					providedIn: "root",
					factory: () =>
						w(Tn, $.Optional | $.SkipSelf) ||
						(function qk() {
							return (typeof $localize < "u" && $localize.locale) || $o;
						})(),
				}),
				Wk = new b("", { providedIn: "root", factory: () => "USD" }),
				fh = new b("");
			let Nw = (() => {
					class e {
						constructor(n) {
							(this._injector = n),
								(this._modules = []),
								(this._destroyListeners = []),
								(this._destroyed = !1);
						}
						bootstrapModuleFactory(n, r) {
							const o = (function FR(e = "zone.js", t) {
								return "noop" === e ? new Uy() : "zone.js" === e ? new Y(t) : e;
							})(
								r?.ngZone,
								(function Aw(e) {
									return {
										enableLongStackTrace: !1,
										shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
										shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
									};
								})({
									eventCoalescing: r?.ngZoneEventCoalescing,
									runCoalescing: r?.ngZoneRunCoalescing,
								}),
							);
							return o.run(() => {
								const i = (function Tx(e, t, n) {
										return new If(e, t, n);
									})(
										n.moduleType,
										this.injector,
										(function Tw(e) {
											return [
												{ provide: Y, useFactory: e },
												{
													provide: vr,
													multi: !0,
													useFactory: () => {
														const t = w($k, { optional: !0 });
														return () => t.initialize();
													},
												},
												{
													provide: vr,
													multi: !0,
													useFactory: () => {
														const t = w(Gk);
														return () => {
															t.initialize();
														};
													},
												},
												{ provide: rv, useFactory: Hk },
											];
										})(() => o),
									),
									s = i.injector.get(En, null);
								return (
									o.runOutsideAngular(() => {
										const a = o.onError.subscribe({
											next: (u) => {
												s.handleError(u);
											},
										});
										i.onDestroy(() => {
											zu(this._modules, i), a.unsubscribe();
										});
									}),
									(function Ew(e, t, n) {
										try {
											const r = n();
											return ws(r)
												? r.catch((o) => {
														throw (t.runOutsideAngular(() => e.handleError(o)), o);
												  })
												: r;
										} catch (r) {
											throw (t.runOutsideAngular(() => e.handleError(r)), r);
										}
									})(s, o, () => {
										const a = i.injector.get(lh);
										return (
											a.runInitializers(),
											a.donePromise.then(
												() => (
													(function R_(e) {
														"string" == typeof e && (N_ = e.toLowerCase().replace(/_/g, "-"));
													})(i.injector.get(Tn, $o) || $o),
													this._moduleDoBootstrap(i),
													i
												),
											)
										);
									})
								);
							});
						}
						bootstrapModule(n, r = []) {
							const o = bw({}, r);
							return (function Uk(e, t, n) {
								const r = new Mf(n);
								return Promise.resolve(r);
							})(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
						}
						_moduleDoBootstrap(n) {
							const r = n.injector.get(Rr);
							if (n._bootstrapComponents.length > 0)
								n._bootstrapComponents.forEach((o) => r.bootstrap(o));
							else {
								if (!n.instance.ngDoBootstrap) throw new _(-403, !1);
								n.instance.ngDoBootstrap(r);
							}
							this._modules.push(n);
						}
						onDestroy(n) {
							this._destroyListeners.push(n);
						}
						get injector() {
							return this._injector;
						}
						destroy() {
							if (this._destroyed) throw new _(404, !1);
							this._modules.slice().forEach((r) => r.destroy()),
								this._destroyListeners.forEach((r) => r());
							const n = this._injector.get(fh, null);
							n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
						}
						get destroyed() {
							return this._destroyed;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(lt));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" }));
					}
					return e;
				})(),
				Jn = null;
			const Rw = new b("");
			function xw(e, t, n = []) {
				const r = `Platform: ${t}`,
					o = new b(r);
				return (i = []) => {
					let s = hh();
					if (!s || s.injector.get(Rw, !1)) {
						const a = [...n, ...i, { provide: o, useValue: !0 }];
						e
							? e(a)
							: (function Qk(e) {
									if (Jn && !Jn.get(Rw, !1)) throw new _(400, !1);
									(function ww() {
										!(function a0(e) {
											lg = e;
										})(() => {
											throw new _(600, !1);
										});
									})(),
										(Jn = e);
									const t = e.get(Nw);
									(function Pw(e) {
										e.get(pm, null)?.forEach((n) => n());
									})(e);
							  })(
									(function Ow(e = [], t) {
										return lt.create({
											name: t,
											providers: [
												{ provide: id, useValue: "platform" },
												{ provide: fh, useValue: new Set([() => (Jn = null)]) },
												...e,
											],
										});
									})(a, r),
							  );
					}
					return (function Yk(e) {
						const t = hh();
						if (!t) throw new _(401, !1);
						return t;
					})();
				};
			}
			function hh() {
				return Jn?.get(Nw) ?? null;
			}
			const t1 = xw(null, "core", []);
			let n1 = (() => {
					class e {
						constructor(n) {}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(Rr));
						});
						static #t = (this.ɵmod = Yt({ type: e }));
						static #n = (this.ɵinj = Bt({}));
					}
					return e;
				})(),
				iE = null;
			function Kn() {
				return iE;
			}
			class x1 {}
			const wt = new b("");
			let _h = (() => {
				class e {
					historyGo(n) {
						throw new Error("");
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: () => w(P1), providedIn: "platform" }));
				}
				return e;
			})();
			const O1 = new b("");
			let P1 = (() => {
				class e extends _h {
					constructor() {
						super(),
							(this._doc = w(wt)),
							(this._location = window.location),
							(this._history = window.history);
					}
					getBaseHrefFromDOM() {
						return Kn().getBaseHref(this._doc);
					}
					onPopState(n) {
						const r = Kn().getGlobalEventTarget(this._doc, "window");
						return (
							r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
						);
					}
					onHashChange(n) {
						const r = Kn().getGlobalEventTarget(this._doc, "window");
						return (
							r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
						);
					}
					get href() {
						return this._location.href;
					}
					get protocol() {
						return this._location.protocol;
					}
					get hostname() {
						return this._location.hostname;
					}
					get port() {
						return this._location.port;
					}
					get pathname() {
						return this._location.pathname;
					}
					get search() {
						return this._location.search;
					}
					get hash() {
						return this._location.hash;
					}
					set pathname(n) {
						this._location.pathname = n;
					}
					pushState(n, r, o) {
						this._history.pushState(n, r, o);
					}
					replaceState(n, r, o) {
						this._history.replaceState(n, r, o);
					}
					forward() {
						this._history.forward();
					}
					back() {
						this._history.back();
					}
					historyGo(n = 0) {
						this._history.go(n);
					}
					getState() {
						return this._history.state;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({
						token: e,
						factory: () => new e(),
						providedIn: "platform",
					}));
				}
				return e;
			})();
			function Ch(e, t) {
				if (0 == e.length) return t;
				if (0 == t.length) return e;
				let n = 0;
				return (
					e.endsWith("/") && n++,
					t.startsWith("/") && n++,
					2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
				);
			}
			function sE(e) {
				const t = e.match(/#|\?|$/),
					n = (t && t.index) || e.length;
				return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
			}
			function An(e) {
				return e && "?" !== e[0] ? "?" + e : e;
			}
			let Or = (() => {
				class e {
					historyGo(n) {
						throw new Error("");
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: () => w(uE), providedIn: "root" }));
				}
				return e;
			})();
			const aE = new b("");
			let uE = (() => {
					class e extends Or {
						constructor(n, r) {
							super(),
								(this._platformLocation = n),
								(this._removeListenerFns = []),
								(this._baseHref =
									r ?? this._platformLocation.getBaseHrefFromDOM() ?? w(wt).location?.origin ?? "");
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n),
							);
						}
						getBaseHref() {
							return this._baseHref;
						}
						prepareExternalUrl(n) {
							return Ch(this._baseHref, n);
						}
						path(n = !1) {
							const r = this._platformLocation.pathname + An(this._platformLocation.search),
								o = this._platformLocation.hash;
							return o && n ? `${r}${o}` : r;
						}
						pushState(n, r, o, i) {
							const s = this.prepareExternalUrl(o + An(i));
							this._platformLocation.pushState(n, r, s);
						}
						replaceState(n, r, o, i) {
							const s = this.prepareExternalUrl(o + An(i));
							this._platformLocation.replaceState(n, r, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
						getState() {
							return this._platformLocation.getState();
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n);
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(_h), S(aE, 8));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})(),
				F1 = (() => {
					class e extends Or {
						constructor(n, r) {
							super(),
								(this._platformLocation = n),
								(this._baseHref = ""),
								(this._removeListenerFns = []),
								null != r && (this._baseHref = r);
						}
						ngOnDestroy() {
							for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
						}
						onPopState(n) {
							this._removeListenerFns.push(
								this._platformLocation.onPopState(n),
								this._platformLocation.onHashChange(n),
							);
						}
						getBaseHref() {
							return this._baseHref;
						}
						path(n = !1) {
							const r = this._platformLocation.hash ?? "#";
							return r.length > 0 ? r.substring(1) : r;
						}
						prepareExternalUrl(n) {
							const r = Ch(this._baseHref, n);
							return r.length > 0 ? "#" + r : r;
						}
						pushState(n, r, o, i) {
							let s = this.prepareExternalUrl(o + An(i));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.pushState(n, r, s);
						}
						replaceState(n, r, o, i) {
							let s = this.prepareExternalUrl(o + An(i));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.replaceState(n, r, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
						getState() {
							return this._platformLocation.getState();
						}
						historyGo(n = 0) {
							this._platformLocation.historyGo?.(n);
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(_h), S(aE, 8));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
					}
					return e;
				})(),
				Is = (() => {
					class e {
						constructor(n) {
							(this._subject = new ge()),
								(this._urlChangeListeners = []),
								(this._urlChangeSubscription = null),
								(this._locationStrategy = n);
							const r = this._locationStrategy.getBaseHref();
							(this._basePath = (function V1(e) {
								if (new RegExp("^(https?:)?//").test(e)) {
									const [, n] = e.split(/\/\/[^\/]+/);
									return n;
								}
								return e;
							})(sE(cE(r)))),
								this._locationStrategy.onPopState((o) => {
									this._subject.emit({ url: this.path(!0), pop: !0, state: o.state, type: o.type });
								});
						}
						ngOnDestroy() {
							this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
						}
						path(n = !1) {
							return this.normalize(this._locationStrategy.path(n));
						}
						getState() {
							return this._locationStrategy.getState();
						}
						isCurrentPathEqualTo(n, r = "") {
							return this.path() == this.normalize(n + An(r));
						}
						normalize(n) {
							return e.stripTrailingSlash(
								(function L1(e, t) {
									if (!e || !t.startsWith(e)) return t;
									const n = t.substring(e.length);
									return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
								})(this._basePath, cE(n)),
							);
						}
						prepareExternalUrl(n) {
							return (
								n && "/" !== n[0] && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
							);
						}
						go(n, r = "", o = null) {
							this._locationStrategy.pushState(o, "", n, r),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(n + An(r)), o);
						}
						replaceState(n, r = "", o = null) {
							this._locationStrategy.replaceState(o, "", n, r),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(n + An(r)), o);
						}
						forward() {
							this._locationStrategy.forward();
						}
						back() {
							this._locationStrategy.back();
						}
						historyGo(n = 0) {
							this._locationStrategy.historyGo?.(n);
						}
						onUrlChange(n) {
							return (
								this._urlChangeListeners.push(n),
								(this._urlChangeSubscription ??= this.subscribe((r) => {
									this._notifyUrlChangeListeners(r.url, r.state);
								})),
								() => {
									const r = this._urlChangeListeners.indexOf(n);
									this._urlChangeListeners.splice(r, 1),
										0 === this._urlChangeListeners.length &&
											(this._urlChangeSubscription?.unsubscribe(),
											(this._urlChangeSubscription = null));
								}
							);
						}
						_notifyUrlChangeListeners(n = "", r) {
							this._urlChangeListeners.forEach((o) => o(n, r));
						}
						subscribe(n, r, o) {
							return this._subject.subscribe({ next: n, error: r, complete: o });
						}
						static #e = (this.normalizeQueryParams = An);
						static #t = (this.joinWithSlash = Ch);
						static #n = (this.stripTrailingSlash = sE);
						static #r = (this.ɵfac = function (r) {
							return new (r || e)(S(Or));
						});
						static #o = (this.ɵprov = M({
							token: e,
							factory: () =>
								(function k1() {
									return new Is(S(Or));
								})(),
							providedIn: "root",
						}));
					}
					return e;
				})();
			function cE(e) {
				return e.replace(/\/index.html$/, "");
			}
			const lE = {
				ADP: [void 0, void 0, 0],
				AFN: [void 0, "\u060b", 0],
				ALL: [void 0, void 0, 0],
				AMD: [void 0, "\u058f", 2],
				AOA: [void 0, "Kz"],
				ARS: [void 0, "$"],
				AUD: ["A$", "$"],
				AZN: [void 0, "\u20bc"],
				BAM: [void 0, "KM"],
				BBD: [void 0, "$"],
				BDT: [void 0, "\u09f3"],
				BHD: [void 0, void 0, 3],
				BIF: [void 0, void 0, 0],
				BMD: [void 0, "$"],
				BND: [void 0, "$"],
				BOB: [void 0, "Bs"],
				BRL: ["R$"],
				BSD: [void 0, "$"],
				BWP: [void 0, "P"],
				BYN: [void 0, void 0, 2],
				BYR: [void 0, void 0, 0],
				BZD: [void 0, "$"],
				CAD: ["CA$", "$", 2],
				CHF: [void 0, void 0, 2],
				CLF: [void 0, void 0, 4],
				CLP: [void 0, "$", 0],
				CNY: ["CN\xa5", "\xa5"],
				COP: [void 0, "$", 2],
				CRC: [void 0, "\u20a1", 2],
				CUC: [void 0, "$"],
				CUP: [void 0, "$"],
				CZK: [void 0, "K\u010d", 2],
				DJF: [void 0, void 0, 0],
				DKK: [void 0, "kr", 2],
				DOP: [void 0, "$"],
				EGP: [void 0, "E\xa3"],
				ESP: [void 0, "\u20a7", 0],
				EUR: ["\u20ac"],
				FJD: [void 0, "$"],
				FKP: [void 0, "\xa3"],
				GBP: ["\xa3"],
				GEL: [void 0, "\u20be"],
				GHS: [void 0, "GH\u20b5"],
				GIP: [void 0, "\xa3"],
				GNF: [void 0, "FG", 0],
				GTQ: [void 0, "Q"],
				GYD: [void 0, "$", 2],
				HKD: ["HK$", "$"],
				HNL: [void 0, "L"],
				HRK: [void 0, "kn"],
				HUF: [void 0, "Ft", 2],
				IDR: [void 0, "Rp", 2],
				ILS: ["\u20aa"],
				INR: ["\u20b9"],
				IQD: [void 0, void 0, 0],
				IRR: [void 0, void 0, 0],
				ISK: [void 0, "kr", 0],
				ITL: [void 0, void 0, 0],
				JMD: [void 0, "$"],
				JOD: [void 0, void 0, 3],
				JPY: ["\xa5", void 0, 0],
				KHR: [void 0, "\u17db"],
				KMF: [void 0, "CF", 0],
				KPW: [void 0, "\u20a9", 0],
				KRW: ["\u20a9", void 0, 0],
				KWD: [void 0, void 0, 3],
				KYD: [void 0, "$"],
				KZT: [void 0, "\u20b8"],
				LAK: [void 0, "\u20ad", 0],
				LBP: [void 0, "L\xa3", 0],
				LKR: [void 0, "Rs"],
				LRD: [void 0, "$"],
				LTL: [void 0, "Lt"],
				LUF: [void 0, void 0, 0],
				LVL: [void 0, "Ls"],
				LYD: [void 0, void 0, 3],
				MGA: [void 0, "Ar", 0],
				MGF: [void 0, void 0, 0],
				MMK: [void 0, "K", 0],
				MNT: [void 0, "\u20ae", 2],
				MRO: [void 0, void 0, 0],
				MUR: [void 0, "Rs", 2],
				MXN: ["MX$", "$"],
				MYR: [void 0, "RM"],
				NAD: [void 0, "$"],
				NGN: [void 0, "\u20a6"],
				NIO: [void 0, "C$"],
				NOK: [void 0, "kr", 2],
				NPR: [void 0, "Rs"],
				NZD: ["NZ$", "$"],
				OMR: [void 0, void 0, 3],
				PHP: ["\u20b1"],
				PKR: [void 0, "Rs", 2],
				PLN: [void 0, "z\u0142"],
				PYG: [void 0, "\u20b2", 0],
				RON: [void 0, "lei"],
				RSD: [void 0, void 0, 0],
				RUB: [void 0, "\u20bd"],
				RWF: [void 0, "RF", 0],
				SBD: [void 0, "$"],
				SEK: [void 0, "kr", 2],
				SGD: [void 0, "$"],
				SHP: [void 0, "\xa3"],
				SLE: [void 0, void 0, 2],
				SLL: [void 0, void 0, 0],
				SOS: [void 0, void 0, 0],
				SRD: [void 0, "$"],
				SSP: [void 0, "\xa3"],
				STD: [void 0, void 0, 0],
				STN: [void 0, "Db"],
				SYP: [void 0, "\xa3", 0],
				THB: [void 0, "\u0e3f"],
				TMM: [void 0, void 0, 0],
				TND: [void 0, void 0, 3],
				TOP: [void 0, "T$"],
				TRL: [void 0, void 0, 0],
				TRY: [void 0, "\u20ba"],
				TTD: [void 0, "$"],
				TWD: ["NT$", "$", 2],
				TZS: [void 0, void 0, 2],
				UAH: [void 0, "\u20b4"],
				UGX: [void 0, void 0, 0],
				USD: ["$"],
				UYI: [void 0, void 0, 0],
				UYU: [void 0, "$"],
				UYW: [void 0, void 0, 4],
				UZS: [void 0, void 0, 2],
				VEF: [void 0, "Bs", 2],
				VND: ["\u20ab", void 0, 0],
				VUV: [void 0, void 0, 0],
				XAF: ["FCFA", void 0, 0],
				XCD: ["EC$", "$"],
				XOF: ["F\u202fCFA", void 0, 0],
				XPF: ["CFPF", void 0, 0],
				XXX: ["\xa4"],
				YER: [void 0, void 0, 0],
				ZAR: [void 0, "R"],
				ZMK: [void 0, void 0, 0],
				ZMW: [void 0, "ZK"],
				ZWD: [void 0, void 0, 0],
			};
			var Ku = (function (e) {
					return (
						(e[(e.Decimal = 0)] = "Decimal"),
						(e[(e.Percent = 1)] = "Percent"),
						(e[(e.Currency = 2)] = "Currency"),
						(e[(e.Scientific = 3)] = "Scientific"),
						e
					);
				})(Ku || {}),
				it = (function (e) {
					return (e[(e.Format = 0)] = "Format"), (e[(e.Standalone = 1)] = "Standalone"), e;
				})(it || {}),
				ae = (function (e) {
					return (
						(e[(e.Narrow = 0)] = "Narrow"),
						(e[(e.Abbreviated = 1)] = "Abbreviated"),
						(e[(e.Wide = 2)] = "Wide"),
						(e[(e.Short = 3)] = "Short"),
						e
					);
				})(ae || {}),
				Et = (function (e) {
					return (
						(e[(e.Short = 0)] = "Short"),
						(e[(e.Medium = 1)] = "Medium"),
						(e[(e.Long = 2)] = "Long"),
						(e[(e.Full = 3)] = "Full"),
						e
					);
				})(Et || {}),
				Me = (function (e) {
					return (
						(e[(e.Decimal = 0)] = "Decimal"),
						(e[(e.Group = 1)] = "Group"),
						(e[(e.List = 2)] = "List"),
						(e[(e.PercentSign = 3)] = "PercentSign"),
						(e[(e.PlusSign = 4)] = "PlusSign"),
						(e[(e.MinusSign = 5)] = "MinusSign"),
						(e[(e.Exponential = 6)] = "Exponential"),
						(e[(e.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
						(e[(e.PerMille = 8)] = "PerMille"),
						(e[(e.Infinity = 9)] = "Infinity"),
						(e[(e.NaN = 10)] = "NaN"),
						(e[(e.TimeSeparator = 11)] = "TimeSeparator"),
						(e[(e.CurrencyDecimal = 12)] = "CurrencyDecimal"),
						(e[(e.CurrencyGroup = 13)] = "CurrencyGroup"),
						e
					);
				})(Me || {});
			function ec(e, t) {
				return Nt(rt(e)[de.DateFormat], t);
			}
			function tc(e, t) {
				return Nt(rt(e)[de.TimeFormat], t);
			}
			function nc(e, t) {
				return Nt(rt(e)[de.DateTimeFormat], t);
			}
			function At(e, t) {
				const n = rt(e),
					r = n[de.NumberSymbols][t];
				if (typeof r > "u") {
					if (t === Me.CurrencyDecimal) return n[de.NumberSymbols][Me.Decimal];
					if (t === Me.CurrencyGroup) return n[de.NumberSymbols][Me.Group];
				}
				return r;
			}
			function dE(e) {
				if (!e[de.ExtraData])
					throw new Error(
						`Missing extra locale data for the locale "${
							e[de.LocaleId]
						}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`,
					);
			}
			function Nt(e, t) {
				for (let n = t; n > -1; n--) if (typeof e[n] < "u") return e[n];
				throw new Error("Locale data API: locale data undefined");
			}
			function Eh(e) {
				const [t, n] = e.split(":");
				return { hours: +t, minutes: +n };
			}
			const J1 =
					/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
				rc = {},
				K1 =
					/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
			var Nn = (function (e) {
					return (
						(e[(e.Short = 0)] = "Short"),
						(e[(e.ShortGMT = 1)] = "ShortGMT"),
						(e[(e.Long = 2)] = "Long"),
						(e[(e.Extended = 3)] = "Extended"),
						e
					);
				})(Nn || {}),
				X = (function (e) {
					return (
						(e[(e.FullYear = 0)] = "FullYear"),
						(e[(e.Month = 1)] = "Month"),
						(e[(e.Date = 2)] = "Date"),
						(e[(e.Hours = 3)] = "Hours"),
						(e[(e.Minutes = 4)] = "Minutes"),
						(e[(e.Seconds = 5)] = "Seconds"),
						(e[(e.FractionalSeconds = 6)] = "FractionalSeconds"),
						(e[(e.Day = 7)] = "Day"),
						e
					);
				})(X || {}),
				J = (function (e) {
					return (
						(e[(e.DayPeriods = 0)] = "DayPeriods"),
						(e[(e.Days = 1)] = "Days"),
						(e[(e.Months = 2)] = "Months"),
						(e[(e.Eras = 3)] = "Eras"),
						e
					);
				})(J || {});
			function eL(e, t, n, r) {
				let o = (function cL(e) {
					if (pE(e)) return e;
					if ("number" == typeof e && !isNaN(e)) return new Date(e);
					if ("string" == typeof e) {
						if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
							const [o, i = 1, s = 1] = e.split("-").map((a) => +a);
							return oc(o, i - 1, s);
						}
						const n = parseFloat(e);
						if (!isNaN(e - n)) return new Date(n);
						let r;
						if ((r = e.match(J1)))
							return (function lL(e) {
								const t = new Date(0);
								let n = 0,
									r = 0;
								const o = e[8] ? t.setUTCFullYear : t.setFullYear,
									i = e[8] ? t.setUTCHours : t.setHours;
								e[9] && ((n = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
									o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
								const s = Number(e[4] || 0) - n,
									a = Number(e[5] || 0) - r,
									u = Number(e[6] || 0),
									c = Math.floor(1e3 * parseFloat("0." + (e[7] || 0)));
								return i.call(t, s, a, u, c), t;
							})(r);
					}
					const t = new Date(e);
					if (!pE(t)) throw new Error(`Unable to convert "${e}" into a date`);
					return t;
				})(e);
				t = Rn(n, t) || t;
				let a,
					s = [];
				for (; t; ) {
					if (((a = K1.exec(t)), !a)) {
						s.push(t);
						break;
					}
					{
						s = s.concat(a.slice(1));
						const l = s.pop();
						if (!l) break;
						t = l;
					}
				}
				let u = o.getTimezoneOffset();
				r &&
					((u = hE(r, u)),
					(o = (function uL(e, t, n) {
						const r = n ? -1 : 1,
							o = e.getTimezoneOffset();
						return (function aL(e, t) {
							return (e = new Date(e.getTime())).setMinutes(e.getMinutes() + t), e;
						})(e, r * (hE(t, o) - o));
					})(o, r, !0)));
				let c = "";
				return (
					s.forEach((l) => {
						const d = (function sL(e) {
							if (Ih[e]) return Ih[e];
							let t;
							switch (e) {
								case "G":
								case "GG":
								case "GGG":
									t = fe(J.Eras, ae.Abbreviated);
									break;
								case "GGGG":
									t = fe(J.Eras, ae.Wide);
									break;
								case "GGGGG":
									t = fe(J.Eras, ae.Narrow);
									break;
								case "y":
									t = Ae(X.FullYear, 1, 0, !1, !0);
									break;
								case "yy":
									t = Ae(X.FullYear, 2, 0, !0, !0);
									break;
								case "yyy":
									t = Ae(X.FullYear, 3, 0, !1, !0);
									break;
								case "yyyy":
									t = Ae(X.FullYear, 4, 0, !1, !0);
									break;
								case "Y":
									t = uc(1);
									break;
								case "YY":
									t = uc(2, !0);
									break;
								case "YYY":
									t = uc(3);
									break;
								case "YYYY":
									t = uc(4);
									break;
								case "M":
								case "L":
									t = Ae(X.Month, 1, 1);
									break;
								case "MM":
								case "LL":
									t = Ae(X.Month, 2, 1);
									break;
								case "MMM":
									t = fe(J.Months, ae.Abbreviated);
									break;
								case "MMMM":
									t = fe(J.Months, ae.Wide);
									break;
								case "MMMMM":
									t = fe(J.Months, ae.Narrow);
									break;
								case "LLL":
									t = fe(J.Months, ae.Abbreviated, it.Standalone);
									break;
								case "LLLL":
									t = fe(J.Months, ae.Wide, it.Standalone);
									break;
								case "LLLLL":
									t = fe(J.Months, ae.Narrow, it.Standalone);
									break;
								case "w":
									t = bh(1);
									break;
								case "ww":
									t = bh(2);
									break;
								case "W":
									t = bh(1, !0);
									break;
								case "d":
									t = Ae(X.Date, 1);
									break;
								case "dd":
									t = Ae(X.Date, 2);
									break;
								case "c":
								case "cc":
									t = Ae(X.Day, 1);
									break;
								case "ccc":
									t = fe(J.Days, ae.Abbreviated, it.Standalone);
									break;
								case "cccc":
									t = fe(J.Days, ae.Wide, it.Standalone);
									break;
								case "ccccc":
									t = fe(J.Days, ae.Narrow, it.Standalone);
									break;
								case "cccccc":
									t = fe(J.Days, ae.Short, it.Standalone);
									break;
								case "E":
								case "EE":
								case "EEE":
									t = fe(J.Days, ae.Abbreviated);
									break;
								case "EEEE":
									t = fe(J.Days, ae.Wide);
									break;
								case "EEEEE":
									t = fe(J.Days, ae.Narrow);
									break;
								case "EEEEEE":
									t = fe(J.Days, ae.Short);
									break;
								case "a":
								case "aa":
								case "aaa":
									t = fe(J.DayPeriods, ae.Abbreviated);
									break;
								case "aaaa":
									t = fe(J.DayPeriods, ae.Wide);
									break;
								case "aaaaa":
									t = fe(J.DayPeriods, ae.Narrow);
									break;
								case "b":
								case "bb":
								case "bbb":
									t = fe(J.DayPeriods, ae.Abbreviated, it.Standalone, !0);
									break;
								case "bbbb":
									t = fe(J.DayPeriods, ae.Wide, it.Standalone, !0);
									break;
								case "bbbbb":
									t = fe(J.DayPeriods, ae.Narrow, it.Standalone, !0);
									break;
								case "B":
								case "BB":
								case "BBB":
									t = fe(J.DayPeriods, ae.Abbreviated, it.Format, !0);
									break;
								case "BBBB":
									t = fe(J.DayPeriods, ae.Wide, it.Format, !0);
									break;
								case "BBBBB":
									t = fe(J.DayPeriods, ae.Narrow, it.Format, !0);
									break;
								case "h":
									t = Ae(X.Hours, 1, -12);
									break;
								case "hh":
									t = Ae(X.Hours, 2, -12);
									break;
								case "H":
									t = Ae(X.Hours, 1);
									break;
								case "HH":
									t = Ae(X.Hours, 2);
									break;
								case "m":
									t = Ae(X.Minutes, 1);
									break;
								case "mm":
									t = Ae(X.Minutes, 2);
									break;
								case "s":
									t = Ae(X.Seconds, 1);
									break;
								case "ss":
									t = Ae(X.Seconds, 2);
									break;
								case "S":
									t = Ae(X.FractionalSeconds, 1);
									break;
								case "SS":
									t = Ae(X.FractionalSeconds, 2);
									break;
								case "SSS":
									t = Ae(X.FractionalSeconds, 3);
									break;
								case "Z":
								case "ZZ":
								case "ZZZ":
									t = sc(Nn.Short);
									break;
								case "ZZZZZ":
									t = sc(Nn.Extended);
									break;
								case "O":
								case "OO":
								case "OOO":
								case "z":
								case "zz":
								case "zzz":
									t = sc(Nn.ShortGMT);
									break;
								case "OOOO":
								case "ZZZZ":
								case "zzzz":
									t = sc(Nn.Long);
									break;
								default:
									return null;
							}
							return (Ih[e] = t), t;
						})(l);
						c += d ? d(o, n, u) : "''" === l ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'");
					}),
					c
				);
			}
			function oc(e, t, n) {
				const r = new Date(0);
				return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r;
			}
			function Rn(e, t) {
				const n = (function B1(e) {
					return rt(e)[de.LocaleId];
				})(e);
				if (((rc[n] ??= {}), rc[n][t])) return rc[n][t];
				let r = "";
				switch (t) {
					case "shortDate":
						r = ec(e, Et.Short);
						break;
					case "mediumDate":
						r = ec(e, Et.Medium);
						break;
					case "longDate":
						r = ec(e, Et.Long);
						break;
					case "fullDate":
						r = ec(e, Et.Full);
						break;
					case "shortTime":
						r = tc(e, Et.Short);
						break;
					case "mediumTime":
						r = tc(e, Et.Medium);
						break;
					case "longTime":
						r = tc(e, Et.Long);
						break;
					case "fullTime":
						r = tc(e, Et.Full);
						break;
					case "short":
						const o = Rn(e, "shortTime"),
							i = Rn(e, "shortDate");
						r = ic(nc(e, Et.Short), [o, i]);
						break;
					case "medium":
						const s = Rn(e, "mediumTime"),
							a = Rn(e, "mediumDate");
						r = ic(nc(e, Et.Medium), [s, a]);
						break;
					case "long":
						const u = Rn(e, "longTime"),
							c = Rn(e, "longDate");
						r = ic(nc(e, Et.Long), [u, c]);
						break;
					case "full":
						const l = Rn(e, "fullTime"),
							d = Rn(e, "fullDate");
						r = ic(nc(e, Et.Full), [l, d]);
				}
				return r && (rc[n][t] = r), r;
			}
			function ic(e, t) {
				return (
					t &&
						(e = e.replace(/\{([^}]+)}/g, function (n, r) {
							return null != t && r in t ? t[r] : n;
						})),
					e
				);
			}
			function zt(e, t, n = "-", r, o) {
				let i = "";
				(e < 0 || (o && e <= 0)) && (o ? (e = 1 - e) : ((e = -e), (i = n)));
				let s = String(e);
				for (; s.length < t; ) s = "0" + s;
				return r && (s = s.slice(s.length - t)), i + s;
			}
			function Ae(e, t, n = 0, r = !1, o = !1) {
				return function (i, s) {
					let a = (function nL(e, t) {
						switch (e) {
							case X.FullYear:
								return t.getFullYear();
							case X.Month:
								return t.getMonth();
							case X.Date:
								return t.getDate();
							case X.Hours:
								return t.getHours();
							case X.Minutes:
								return t.getMinutes();
							case X.Seconds:
								return t.getSeconds();
							case X.FractionalSeconds:
								return t.getMilliseconds();
							case X.Day:
								return t.getDay();
							default:
								throw new Error(`Unknown DateType value "${e}".`);
						}
					})(e, i);
					if (((n > 0 || a > -n) && (a += n), e === X.Hours)) 0 === a && -12 === n && (a = 12);
					else if (e === X.FractionalSeconds)
						return (function tL(e, t) {
							return zt(e, 3).substring(0, t);
						})(a, t);
					const u = At(s, Me.MinusSign);
					return zt(a, t, u, r, o);
				};
			}
			function fe(e, t, n = it.Format, r = !1) {
				return function (o, i) {
					return (function rL(e, t, n, r, o, i) {
						switch (n) {
							case J.Months:
								return (function H1(e, t, n) {
									const r = rt(e),
										i = Nt([r[de.MonthsFormat], r[de.MonthsStandalone]], t);
									return Nt(i, n);
								})(t, o, r)[e.getMonth()];
							case J.Days:
								return (function $1(e, t, n) {
									const r = rt(e),
										i = Nt([r[de.DaysFormat], r[de.DaysStandalone]], t);
									return Nt(i, n);
								})(t, o, r)[e.getDay()];
							case J.DayPeriods:
								const s = e.getHours(),
									a = e.getMinutes();
								if (i) {
									const c = (function W1(e) {
											const t = rt(e);
											return (
												dE(t),
												(t[de.ExtraData][2] || []).map((r) =>
													"string" == typeof r ? Eh(r) : [Eh(r[0]), Eh(r[1])],
												)
											);
										})(t),
										l = (function Z1(e, t, n) {
											const r = rt(e);
											dE(r);
											const i = Nt([r[de.ExtraData][0], r[de.ExtraData][1]], t) || [];
											return Nt(i, n) || [];
										})(t, o, r),
										d = c.findIndex((f) => {
											if (Array.isArray(f)) {
												const [h, p] = f,
													g = s >= h.hours && a >= h.minutes,
													m = s < p.hours || (s === p.hours && a < p.minutes);
												if (h.hours < p.hours) {
													if (g && m) return !0;
												} else if (g || m) return !0;
											} else if (f.hours === s && f.minutes === a) return !0;
											return !1;
										});
									if (-1 !== d) return l[d];
								}
								return (function U1(e, t, n) {
									const r = rt(e),
										i = Nt([r[de.DayPeriodsFormat], r[de.DayPeriodsStandalone]], t);
									return Nt(i, n);
								})(t, o, r)[s < 12 ? 0 : 1];
							case J.Eras:
								return (function z1(e, t) {
									return Nt(rt(e)[de.Eras], t);
								})(t, r)[e.getFullYear() <= 0 ? 0 : 1];
							default:
								throw new Error(`unexpected translation type ${n}`);
						}
					})(o, i, e, t, n, r);
				};
			}
			function sc(e) {
				return function (t, n, r) {
					const o = -1 * r,
						i = At(n, Me.MinusSign),
						s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
					switch (e) {
						case Nn.Short:
							return (o >= 0 ? "+" : "") + zt(s, 2, i) + zt(Math.abs(o % 60), 2, i);
						case Nn.ShortGMT:
							return "GMT" + (o >= 0 ? "+" : "") + zt(s, 1, i);
						case Nn.Long:
							return "GMT" + (o >= 0 ? "+" : "") + zt(s, 2, i) + ":" + zt(Math.abs(o % 60), 2, i);
						case Nn.Extended:
							return 0 === r
								? "Z"
								: (o >= 0 ? "+" : "") + zt(s, 2, i) + ":" + zt(Math.abs(o % 60), 2, i);
						default:
							throw new Error(`Unknown zone width "${e}"`);
					}
				};
			}
			const oL = 0,
				ac = 4;
			function fE(e) {
				const t = e.getDay(),
					n = 0 === t ? -3 : ac - t;
				return oc(e.getFullYear(), e.getMonth(), e.getDate() + n);
			}
			function bh(e, t = !1) {
				return function (n, r) {
					let o;
					if (t) {
						const i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
							s = n.getDate();
						o = 1 + Math.floor((s + i) / 7);
					} else {
						const i = fE(n),
							s = (function iL(e) {
								const t = oc(e, oL, 1).getDay();
								return oc(e, 0, 1 + (t <= ac ? ac : ac + 7) - t);
							})(i.getFullYear()),
							a = i.getTime() - s.getTime();
						o = 1 + Math.round(a / 6048e5);
					}
					return zt(o, e, At(r, Me.MinusSign));
				};
			}
			function uc(e, t = !1) {
				return function (n, r) {
					return zt(fE(n).getFullYear(), e, At(r, Me.MinusSign), t);
				};
			}
			const Ih = {};
			function hE(e, t) {
				e = e.replace(/:/g, "");
				const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
				return isNaN(n) ? t : n;
			}
			function pE(e) {
				return e instanceof Date && !isNaN(e.valueOf());
			}
			const dL = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
				gE = 22,
				cc = ".",
				Ms = "0",
				fL = ";",
				hL = ",",
				Mh = "#";
			function gL(e, t, n, r, o) {
				const s = (function Th(e, t = "-") {
					const n = {
							minInt: 1,
							minFrac: 0,
							maxFrac: 0,
							posPre: "",
							posSuf: "",
							negPre: "",
							negSuf: "",
							gSize: 0,
							lgSize: 0,
						},
						r = e.split(fL),
						o = r[0],
						i = r[1],
						s =
							-1 !== o.indexOf(cc)
								? o.split(cc)
								: [o.substring(0, o.lastIndexOf(Ms) + 1), o.substring(o.lastIndexOf(Ms) + 1)],
						a = s[0],
						u = s[1] || "";
					n.posPre = a.substring(0, a.indexOf(Mh));
					for (let l = 0; l < u.length; l++) {
						const d = u.charAt(l);
						d === Ms
							? (n.minFrac = n.maxFrac = l + 1)
							: d === Mh
							? (n.maxFrac = l + 1)
							: (n.posSuf += d);
					}
					const c = a.split(hL);
					if (
						((n.gSize = c[1] ? c[1].length : 0),
						(n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
						i)
					) {
						const l = o.length - n.posPre.length - n.posSuf.length,
							d = i.indexOf(Mh);
						(n.negPre = i.substring(0, d).replace(/'/g, "")),
							(n.negSuf = i.slice(d + l).replace(/'/g, ""));
					} else (n.negPre = t + n.posPre), (n.negSuf = n.posSuf);
					return n;
				})(
					(function wh(e, t) {
						return rt(e)[de.NumberFormats][t];
					})(t, Ku.Currency),
					At(t, Me.MinusSign),
				);
				return (
					(s.minFrac = (function X1(e) {
						let t;
						const n = lE[e];
						return n && (t = n[2]), "number" == typeof t ? t : 2;
					})(r)),
					(s.maxFrac = s.minFrac),
					(function Sh(e, t, n, r, o, i, s = !1) {
						let a = "",
							u = !1;
						if (isFinite(e)) {
							let c = (function DL(e) {
								let r,
									o,
									i,
									s,
									a,
									t = Math.abs(e) + "",
									n = 0;
								for (
									(o = t.indexOf(cc)) > -1 && (t = t.replace(cc, "")),
										(i = t.search(/e/i)) > 0
											? (o < 0 && (o = i), (o += +t.slice(i + 1)), (t = t.substring(0, i)))
											: o < 0 && (o = t.length),
										i = 0;
									t.charAt(i) === Ms;
									i++
								);
								if (i === (a = t.length)) (r = [0]), (o = 1);
								else {
									for (a--; t.charAt(a) === Ms; ) a--;
									for (o -= i, r = [], s = 0; i <= a; i++, s++) r[s] = Number(t.charAt(i));
								}
								return (
									o > gE && ((r = r.splice(0, gE - 1)), (n = o - 1), (o = 1)),
									{ digits: r, exponent: n, integerLen: o }
								);
							})(e);
							s &&
								(c = (function yL(e) {
									if (0 === e.digits[0]) return e;
									const t = e.digits.length - e.integerLen;
									return (
										e.exponent
											? (e.exponent += 2)
											: (0 === t ? e.digits.push(0, 0) : 1 === t && e.digits.push(0),
											  (e.integerLen += 2)),
										e
									);
								})(c));
							let l = t.minInt,
								d = t.minFrac,
								f = t.maxFrac;
							if (i) {
								const v = i.match(dL);
								if (null === v) throw new Error(`${i} is not a valid digit info`);
								const I = v[1],
									A = v[3],
									F = v[5];
								null != I && (l = Ah(I)),
									null != A && (d = Ah(A)),
									null != F ? (f = Ah(F)) : null != A && d > f && (f = d);
							}
							!(function _L(e, t, n) {
								if (t > n)
									throw new Error(
										`The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`,
									);
								let r = e.digits,
									o = r.length - e.integerLen;
								const i = Math.min(Math.max(t, o), n);
								let s = i + e.integerLen,
									a = r[s];
								if (s > 0) {
									r.splice(Math.max(e.integerLen, s));
									for (let d = s; d < r.length; d++) r[d] = 0;
								} else {
									(o = Math.max(0, o)),
										(e.integerLen = 1),
										(r.length = Math.max(1, (s = i + 1))),
										(r[0] = 0);
									for (let d = 1; d < s; d++) r[d] = 0;
								}
								if (a >= 5)
									if (s - 1 < 0) {
										for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
										r.unshift(1), e.integerLen++;
									} else r[s - 1]++;
								for (; o < Math.max(0, i); o++) r.push(0);
								let u = 0 !== i;
								const c = t + e.integerLen,
									l = r.reduceRight(function (d, f, h, p) {
										return (
											(p[h] = (f += d) < 10 ? f : f - 10),
											u && (0 === p[h] && h >= c ? p.pop() : (u = !1)),
											f >= 10 ? 1 : 0
										);
									}, 0);
								l && (r.unshift(l), e.integerLen++);
							})(c, d, f);
							let h = c.digits,
								p = c.integerLen;
							const g = c.exponent;
							let m = [];
							for (u = h.every((v) => !v); p < l; p++) h.unshift(0);
							for (; p < 0; p++) h.unshift(0);
							p > 0 ? (m = h.splice(p, h.length)) : ((m = h), (h = [0]));
							const D = [];
							for (
								h.length >= t.lgSize && D.unshift(h.splice(-t.lgSize, h.length).join(""));
								h.length > t.gSize;

							)
								D.unshift(h.splice(-t.gSize, h.length).join(""));
							h.length && D.unshift(h.join("")),
								(a = D.join(At(n, r))),
								m.length && (a += At(n, o) + m.join("")),
								g && (a += At(n, Me.Exponential) + "+" + g);
						} else a = At(n, Me.Infinity);
						return (a = e < 0 && !u ? t.negPre + a + t.negSuf : t.posPre + a + t.posSuf), a;
					})(e, s, t, Me.CurrencyGroup, Me.CurrencyDecimal, o)
						.replace("\xa4", n)
						.replace("\xa4", "")
						.trim()
				);
			}
			function Ah(e) {
				const t = parseInt(e);
				if (isNaN(t)) throw new Error("Invalid integer literal when parsing " + e);
				return t;
			}
			function yE(e, t) {
				t = encodeURIComponent(t);
				for (const n of e.split(";")) {
					const r = n.indexOf("="),
						[o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
					if (o.trim() === t) return decodeURIComponent(i);
				}
				return null;
			}
			const Rh = /\s+/,
				DE = [];
			let _E = (() => {
				class e {
					constructor(n, r) {
						(this._ngEl = n),
							(this._renderer = r),
							(this.initialClasses = DE),
							(this.stateMap = new Map());
					}
					set klass(n) {
						this.initialClasses = null != n ? n.trim().split(Rh) : DE;
					}
					set ngClass(n) {
						this.rawClass = "string" == typeof n ? n.trim().split(Rh) : n;
					}
					ngDoCheck() {
						for (const r of this.initialClasses) this._updateState(r, !0);
						const n = this.rawClass;
						if (Array.isArray(n) || n instanceof Set) for (const r of n) this._updateState(r, !0);
						else if (null != n) for (const r of Object.keys(n)) this._updateState(r, !!n[r]);
						this._applyStateDiff();
					}
					_updateState(n, r) {
						const o = this.stateMap.get(n);
						void 0 !== o
							? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)), (o.touched = !0))
							: this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
					}
					_applyStateDiff() {
						for (const n of this.stateMap) {
							const r = n[0],
								o = n[1];
							o.changed
								? (this._toggleClass(r, o.enabled), (o.changed = !1))
								: o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)),
								(o.touched = !1);
						}
					}
					_toggleClass(n, r) {
						(n = n.trim()).length > 0 &&
							n.split(Rh).forEach((o) => {
								r
									? this._renderer.addClass(this._ngEl.nativeElement, o)
									: this._renderer.removeClass(this._ngEl.nativeElement, o);
							});
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(yt), C(Sn));
					});
					static #t = (this.ɵdir = P({
						type: e,
						selectors: [["", "ngClass", ""]],
						inputs: { klass: [me.None, "class", "klass"], ngClass: "ngClass" },
						standalone: !0,
					}));
				}
				return e;
			})();
			class EL {
				constructor(t, n, r, o) {
					(this.$implicit = t), (this.ngForOf = n), (this.index = r), (this.count = o);
				}
				get first() {
					return 0 === this.index;
				}
				get last() {
					return this.index === this.count - 1;
				}
				get even() {
					return this.index % 2 == 0;
				}
				get odd() {
					return !this.even;
				}
			}
			let xh = (() => {
				class e {
					set ngForOf(n) {
						(this._ngForOf = n), (this._ngForOfDirty = !0);
					}
					set ngForTrackBy(n) {
						this._trackByFn = n;
					}
					get ngForTrackBy() {
						return this._trackByFn;
					}
					constructor(n, r, o) {
						(this._viewContainer = n),
							(this._template = r),
							(this._differs = o),
							(this._ngForOf = null),
							(this._ngForOfDirty = !0),
							(this._differ = null);
					}
					set ngForTemplate(n) {
						n && (this._template = n);
					}
					ngDoCheck() {
						if (this._ngForOfDirty) {
							this._ngForOfDirty = !1;
							const n = this._ngForOf;
							!this._differ &&
								n &&
								(this._differ = this._differs.find(n).create(this.ngForTrackBy));
						}
						if (this._differ) {
							const n = this._differ.diff(this._ngForOf);
							n && this._applyChanges(n);
						}
					}
					_applyChanges(n) {
						const r = this._viewContainer;
						n.forEachOperation((o, i, s) => {
							if (null == o.previousIndex)
								r.createEmbeddedView(
									this._template,
									new EL(o.item, this._ngForOf, -1, -1),
									null === s ? void 0 : s,
								);
							else if (null == s) r.remove(null === i ? void 0 : i);
							else if (null !== i) {
								const a = r.get(i);
								r.move(a, s), wE(a, o);
							}
						});
						for (let o = 0, i = r.length; o < i; o++) {
							const a = r.get(o).context;
							(a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
						}
						n.forEachIdentityChange((o) => {
							wE(r.get(o.currentIndex), o);
						});
					}
					static ngTemplateContextGuard(n, r) {
						return !0;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(Ut), C(Mn), C(lf));
					});
					static #t = (this.ɵdir = P({
						type: e,
						selectors: [["", "ngFor", "", "ngForOf", ""]],
						inputs: {
							ngForOf: "ngForOf",
							ngForTrackBy: "ngForTrackBy",
							ngForTemplate: "ngForTemplate",
						},
						standalone: !0,
					}));
				}
				return e;
			})();
			function wE(e, t) {
				e.context.$implicit = t.item;
			}
			let lc = (() => {
				class e {
					constructor(n, r) {
						(this._viewContainer = n),
							(this._context = new bL()),
							(this._thenTemplateRef = null),
							(this._elseTemplateRef = null),
							(this._thenViewRef = null),
							(this._elseViewRef = null),
							(this._thenTemplateRef = r);
					}
					set ngIf(n) {
						(this._context.$implicit = this._context.ngIf = n), this._updateView();
					}
					set ngIfThen(n) {
						EE("ngIfThen", n),
							(this._thenTemplateRef = n),
							(this._thenViewRef = null),
							this._updateView();
					}
					set ngIfElse(n) {
						EE("ngIfElse", n),
							(this._elseTemplateRef = n),
							(this._elseViewRef = null),
							this._updateView();
					}
					_updateView() {
						this._context.$implicit
							? this._thenViewRef ||
							  (this._viewContainer.clear(),
							  (this._elseViewRef = null),
							  this._thenTemplateRef &&
									(this._thenViewRef = this._viewContainer.createEmbeddedView(
										this._thenTemplateRef,
										this._context,
									)))
							: this._elseViewRef ||
							  (this._viewContainer.clear(),
							  (this._thenViewRef = null),
							  this._elseTemplateRef &&
									(this._elseViewRef = this._viewContainer.createEmbeddedView(
										this._elseTemplateRef,
										this._context,
									)));
					}
					static ngTemplateContextGuard(n, r) {
						return !0;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(Ut), C(Mn));
					});
					static #t = (this.ɵdir = P({
						type: e,
						selectors: [["", "ngIf", ""]],
						inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
						standalone: !0,
					}));
				}
				return e;
			})();
			class bL {
				constructor() {
					(this.$implicit = null), (this.ngIf = null);
				}
			}
			function EE(e, t) {
				if (t && !t.createEmbeddedView)
					throw new Error(`${e} must be a TemplateRef, but received '${xe(t)}'.`);
			}
			function Gt(e, t) {
				return new _(2100, !1);
			}
			class TL {
				createSubscription(t, n) {
					return Ny(() =>
						t.subscribe({
							next: n,
							error: (r) => {
								throw r;
							},
						}),
					);
				}
				dispose(t) {
					Ny(() => t.unsubscribe());
				}
			}
			class AL {
				createSubscription(t, n) {
					return t.then(n, (r) => {
						throw r;
					});
				}
				dispose(t) {}
			}
			const NL = new AL(),
				RL = new TL();
			let IE = (() => {
				class e {
					constructor(n) {
						(this._latestValue = null),
							(this._subscription = null),
							(this._obj = null),
							(this._strategy = null),
							(this._ref = n);
					}
					ngOnDestroy() {
						this._subscription && this._dispose(), (this._ref = null);
					}
					transform(n) {
						return this._obj
							? n !== this._obj
								? (this._dispose(), this.transform(n))
								: this._latestValue
							: (n && this._subscribe(n), this._latestValue);
					}
					_subscribe(n) {
						(this._obj = n),
							(this._strategy = this._selectStrategy(n)),
							(this._subscription = this._strategy.createSubscription(n, (r) =>
								this._updateLatestValue(n, r),
							));
					}
					_selectStrategy(n) {
						if (ws(n)) return NL;
						if (Cw(n)) return RL;
						throw Gt();
					}
					_dispose() {
						this._strategy.dispose(this._subscription),
							(this._latestValue = null),
							(this._subscription = null),
							(this._obj = null);
					}
					_updateLatestValue(n, r) {
						n === this._obj && ((this._latestValue = r), this._ref.markForCheck());
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(Co, 16));
					});
					static #t = (this.ɵpipe = ze({ name: "async", type: e, pure: !1, standalone: !0 }));
				}
				return e;
			})();
			const LL = new b(""),
				VL = new b("");
			let ME = (() => {
					class e {
						constructor(n, r, o) {
							(this.locale = n), (this.defaultTimezone = r), (this.defaultOptions = o);
						}
						transform(n, r, o, i) {
							if (null == n || "" === n || n != n) return null;
							try {
								return eL(
									n,
									r ?? this.defaultOptions?.dateFormat ?? "mediumDate",
									i || this.locale,
									o ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0,
								);
							} catch (s) {
								throw Gt();
							}
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(C(Tn, 16), C(LL, 24), C(VL, 24));
						});
						static #t = (this.ɵpipe = ze({ name: "date", type: e, pure: !0, standalone: !0 }));
					}
					return e;
				})(),
				TE = (() => {
					class e {
						constructor(n, r = "USD") {
							(this._locale = n), (this._defaultCurrencyCode = r);
						}
						transform(n, r = this._defaultCurrencyCode, o = "symbol", i, s) {
							if (
								!(function Fh(e) {
									return !(null == e || "" === e || e != e);
								})(n)
							)
								return null;
							(s ||= this._locale), "boolean" == typeof o && (o = o ? "symbol" : "code");
							let a = r || this._defaultCurrencyCode;
							"code" !== o &&
								(a =
									"symbol" === o || "symbol-narrow" === o
										? (function Q1(e, t, n = "en") {
												const r =
														(function G1(e) {
															return rt(e)[de.Currencies];
														})(n)[e] ||
														lE[e] ||
														[],
													o = r[1];
												return "narrow" === t && "string" == typeof o ? o : r[0] || e;
										  })(a, "symbol" === o ? "wide" : "narrow", s)
										: o);
							try {
								return gL(
									(function kh(e) {
										if ("string" == typeof e && !isNaN(Number(e) - parseFloat(e))) return Number(e);
										if ("number" != typeof e) throw new Error(`${e} is not a number`);
										return e;
									})(n),
									s,
									a,
									r,
									i,
								);
							} catch (u) {
								throw Gt();
							}
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(C(Tn, 16), C(Wk, 16));
						});
						static #t = (this.ɵpipe = ze({ name: "currency", type: e, pure: !0, standalone: !0 }));
					}
					return e;
				})();
			let AE = (() => {
				class e {
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵmod = Yt({ type: e }));
					static #n = (this.ɵinj = Bt({}));
				}
				return e;
			})();
			const NE = "browser";
			function RE(e) {
				return "server" === e;
			}
			let XL = (() => {
				class e {
					static #e = (this.ɵprov = M({
						token: e,
						providedIn: "root",
						factory: () =>
							(function YL(e) {
								return e === NE;
							})(w(Un))
								? new JL(w(wt), window)
								: new eV(),
					}));
				}
				return e;
			})();
			class JL {
				constructor(t, n) {
					(this.document = t), (this.window = n), (this.offset = () => [0, 0]);
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t;
				}
				getScrollPosition() {
					return [this.window.scrollX, this.window.scrollY];
				}
				scrollToPosition(t) {
					this.window.scrollTo(t[0], t[1]);
				}
				scrollToAnchor(t) {
					const n = (function KL(e, t) {
						const n = e.getElementById(t) || e.getElementsByName(t)[0];
						if (n) return n;
						if (
							"function" == typeof e.createTreeWalker &&
							e.body &&
							"function" == typeof e.body.attachShadow
						) {
							const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
							let o = r.currentNode;
							for (; o; ) {
								const i = o.shadowRoot;
								if (i) {
									const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
									if (s) return s;
								}
								o = r.nextNode();
							}
						}
						return null;
					})(this.document, t);
					n && (this.scrollToElement(n), n.focus());
				}
				setHistoryScrollRestoration(t) {
					this.window.history.scrollRestoration = t;
				}
				scrollToElement(t) {
					const n = t.getBoundingClientRect(),
						r = n.left + this.window.pageXOffset,
						o = n.top + this.window.pageYOffset,
						i = this.offset();
					this.window.scrollTo(r - i[0], o - i[1]);
				}
			}
			class eV {
				setOffset(t) {}
				getScrollPosition() {
					return [0, 0];
				}
				scrollToPosition(t) {}
				scrollToAnchor(t) {}
				setHistoryScrollRestoration(t) {}
			}
			class xE {}
			class TV extends x1 {
				constructor() {
					super(...arguments), (this.supportsDOMEvents = !0);
				}
			}
			class Vh extends TV {
				static makeCurrent() {
					!(function R1(e) {
						iE ??= e;
					})(new Vh());
				}
				onAndCancel(t, n, r) {
					return (
						t.addEventListener(n, r),
						() => {
							t.removeEventListener(n, r);
						}
					);
				}
				dispatchEvent(t, n) {
					t.dispatchEvent(n);
				}
				remove(t) {
					t.parentNode && t.parentNode.removeChild(t);
				}
				createElement(t, n) {
					return (n = n || this.getDefaultDocument()).createElement(t);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument("fakeTitle");
				}
				getDefaultDocument() {
					return document;
				}
				isElementNode(t) {
					return t.nodeType === Node.ELEMENT_NODE;
				}
				isShadowRoot(t) {
					return t instanceof DocumentFragment;
				}
				getGlobalEventTarget(t, n) {
					return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null;
				}
				getBaseHref(t) {
					const n = (function AV() {
						return (As = As || document.querySelector("base")), As ? As.getAttribute("href") : null;
					})();
					return null == n
						? null
						: (function NV(e) {
								return new URL(e, document.baseURI).pathname;
						  })(n);
				}
				resetBaseElement() {
					As = null;
				}
				getUserAgent() {
					return window.navigator.userAgent;
				}
				getCookie(t) {
					return yE(document.cookie, t);
				}
			}
			let As = null,
				xV = (() => {
					class e {
						build() {
							return new XMLHttpRequest();
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
					}
					return e;
				})();
			const jh = new b("");
			let UE = (() => {
				class e {
					constructor(n, r) {
						(this._zone = r),
							(this._eventNameToPlugin = new Map()),
							n.forEach((o) => {
								o.manager = this;
							}),
							(this._plugins = n.slice().reverse());
					}
					addEventListener(n, r, o) {
						return this._findPluginFor(r).addEventListener(n, r, o);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(n) {
						let r = this._eventNameToPlugin.get(n);
						if (r) return r;
						if (((r = this._plugins.find((i) => i.supports(n))), !r)) throw new _(5101, !1);
						return this._eventNameToPlugin.set(n, r), r;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(jh), S(Y));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			class $E {
				constructor(t) {
					this._doc = t;
				}
			}
			const Bh = "ng-app-id";
			let HE = (() => {
				class e {
					constructor(n, r, o, i = {}) {
						(this.doc = n),
							(this.appId = r),
							(this.nonce = o),
							(this.platformId = i),
							(this.styleRef = new Map()),
							(this.hostNodes = new Set()),
							(this.styleNodesInDOM = this.collectServerRenderedStyles()),
							(this.platformIsServer = RE(i)),
							this.resetHostNodes();
					}
					addStyles(n) {
						for (const r of n) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
					}
					removeStyles(n) {
						for (const r of n) this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
					}
					ngOnDestroy() {
						const n = this.styleNodesInDOM;
						n && (n.forEach((r) => r.remove()), n.clear());
						for (const r of this.getAllStyles()) this.onStyleRemoved(r);
						this.resetHostNodes();
					}
					addHost(n) {
						this.hostNodes.add(n);
						for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
					}
					removeHost(n) {
						this.hostNodes.delete(n);
					}
					getAllStyles() {
						return this.styleRef.keys();
					}
					onStyleAdded(n) {
						for (const r of this.hostNodes) this.addStyleToHost(r, n);
					}
					onStyleRemoved(n) {
						const r = this.styleRef;
						r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
					}
					collectServerRenderedStyles() {
						const n = this.doc.head?.querySelectorAll(`style[${Bh}="${this.appId}"]`);
						if (n?.length) {
							const r = new Map();
							return (
								n.forEach((o) => {
									null != o.textContent && r.set(o.textContent, o);
								}),
								r
							);
						}
						return null;
					}
					changeUsageCount(n, r) {
						const o = this.styleRef;
						if (o.has(n)) {
							const i = o.get(n);
							return (i.usage += r), i.usage;
						}
						return o.set(n, { usage: r, elements: [] }), r;
					}
					getStyleElement(n, r) {
						const o = this.styleNodesInDOM,
							i = o?.get(r);
						if (i?.parentNode === n) return o.delete(r), i.removeAttribute(Bh), i;
						{
							const s = this.doc.createElement("style");
							return (
								this.nonce && s.setAttribute("nonce", this.nonce),
								(s.textContent = r),
								this.platformIsServer && s.setAttribute(Bh, this.appId),
								n.appendChild(s),
								s
							);
						}
					}
					addStyleToHost(n, r) {
						const o = this.getStyleElement(n, r),
							i = this.styleRef,
							s = i.get(r)?.elements;
						s ? s.push(o) : i.set(r, { elements: [o], usage: 1 });
					}
					resetHostNodes() {
						const n = this.hostNodes;
						n.clear(), n.add(this.doc.head);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(wt), S(_a), S(gm, 8), S(Un));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			const Uh = {
					svg: "http://www.w3.org/2000/svg",
					xhtml: "http://www.w3.org/1999/xhtml",
					xlink: "http://www.w3.org/1999/xlink",
					xml: "http://www.w3.org/XML/1998/namespace",
					xmlns: "http://www.w3.org/2000/xmlns/",
					math: "http://www.w3.org/1998/MathML/",
				},
				$h = /%COMP%/g,
				kV = new b("", { providedIn: "root", factory: () => !0 });
			function GE(e, t) {
				return t.map((n) => n.replace($h, e));
			}
			let qE = (() => {
				class e {
					constructor(n, r, o, i, s, a, u, c = null) {
						(this.eventManager = n),
							(this.sharedStylesHost = r),
							(this.appId = o),
							(this.removeStylesOnCompDestroy = i),
							(this.doc = s),
							(this.platformId = a),
							(this.ngZone = u),
							(this.nonce = c),
							(this.rendererByCompId = new Map()),
							(this.platformIsServer = RE(a)),
							(this.defaultRenderer = new Hh(n, s, u, this.platformIsServer));
					}
					createRenderer(n, r) {
						if (!n || !r) return this.defaultRenderer;
						this.platformIsServer &&
							r.encapsulation === Pt.ShadowDom &&
							(r = { ...r, encapsulation: Pt.Emulated });
						const o = this.getOrCreateRenderer(n, r);
						return o instanceof ZE ? o.applyToHost(n) : o instanceof zh && o.applyStyles(), o;
					}
					getOrCreateRenderer(n, r) {
						const o = this.rendererByCompId;
						let i = o.get(r.id);
						if (!i) {
							const s = this.doc,
								a = this.ngZone,
								u = this.eventManager,
								c = this.sharedStylesHost,
								l = this.removeStylesOnCompDestroy,
								d = this.platformIsServer;
							switch (r.encapsulation) {
								case Pt.Emulated:
									i = new ZE(u, c, r, this.appId, l, s, a, d);
									break;
								case Pt.ShadowDom:
									return new BV(u, c, n, r, s, a, this.nonce, d);
								default:
									i = new zh(u, c, r, l, s, a, d);
							}
							o.set(r.id, i);
						}
						return i;
					}
					ngOnDestroy() {
						this.rendererByCompId.clear();
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(UE), S(HE), S(_a), S(kV), S(wt), S(Un), S(Y), S(gm));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			class Hh {
				constructor(t, n, r, o) {
					(this.eventManager = t),
						(this.doc = n),
						(this.ngZone = r),
						(this.platformIsServer = o),
						(this.data = Object.create(null)),
						(this.throwOnSyntheticProps = !0),
						(this.destroyNode = null);
				}
				destroy() {}
				createElement(t, n) {
					return n ? this.doc.createElementNS(Uh[n] || n, t) : this.doc.createElement(t);
				}
				createComment(t) {
					return this.doc.createComment(t);
				}
				createText(t) {
					return this.doc.createTextNode(t);
				}
				appendChild(t, n) {
					(WE(t) ? t.content : t).appendChild(n);
				}
				insertBefore(t, n, r) {
					t && (WE(t) ? t.content : t).insertBefore(n, r);
				}
				removeChild(t, n) {
					t && t.removeChild(n);
				}
				selectRootElement(t, n) {
					let r = "string" == typeof t ? this.doc.querySelector(t) : t;
					if (!r) throw new _(-5104, !1);
					return n || (r.textContent = ""), r;
				}
				parentNode(t) {
					return t.parentNode;
				}
				nextSibling(t) {
					return t.nextSibling;
				}
				setAttribute(t, n, r, o) {
					if (o) {
						n = o + ":" + n;
						const i = Uh[o];
						i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
					} else t.setAttribute(n, r);
				}
				removeAttribute(t, n, r) {
					if (r) {
						const o = Uh[r];
						o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
					} else t.removeAttribute(n);
				}
				addClass(t, n) {
					t.classList.add(n);
				}
				removeClass(t, n) {
					t.classList.remove(n);
				}
				setStyle(t, n, r, o) {
					o & (qn.DashCase | qn.Important)
						? t.style.setProperty(n, r, o & qn.Important ? "important" : "")
						: (t.style[n] = r);
				}
				removeStyle(t, n, r) {
					r & qn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
				}
				setProperty(t, n, r) {
					null != t && (t[n] = r);
				}
				setValue(t, n) {
					t.nodeValue = n;
				}
				listen(t, n, r) {
					if ("string" == typeof t && !(t = Kn().getGlobalEventTarget(this.doc, t)))
						throw new Error(`Unsupported event target ${t} for event ${n}`);
					return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r));
				}
				decoratePreventDefault(t) {
					return (n) => {
						if ("__ngUnwrap__" === n) return t;
						!1 === (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) &&
							n.preventDefault();
					};
				}
			}
			function WE(e) {
				return "TEMPLATE" === e.tagName && void 0 !== e.content;
			}
			class BV extends Hh {
				constructor(t, n, r, o, i, s, a, u) {
					super(t, i, s, u),
						(this.sharedStylesHost = n),
						(this.hostEl = r),
						(this.shadowRoot = r.attachShadow({ mode: "open" })),
						this.sharedStylesHost.addHost(this.shadowRoot);
					const c = GE(o.id, o.styles);
					for (const l of c) {
						const d = document.createElement("style");
						a && d.setAttribute("nonce", a), (d.textContent = l), this.shadowRoot.appendChild(d);
					}
				}
				nodeOrShadowRoot(t) {
					return t === this.hostEl ? this.shadowRoot : t;
				}
				appendChild(t, n) {
					return super.appendChild(this.nodeOrShadowRoot(t), n);
				}
				insertBefore(t, n, r) {
					return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
				}
				removeChild(t, n) {
					return super.removeChild(this.nodeOrShadowRoot(t), n);
				}
				parentNode(t) {
					return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot);
				}
			}
			class zh extends Hh {
				constructor(t, n, r, o, i, s, a, u) {
					super(t, i, s, a),
						(this.sharedStylesHost = n),
						(this.removeStylesOnCompDestroy = o),
						(this.styles = u ? GE(u, r.styles) : r.styles);
				}
				applyStyles() {
					this.sharedStylesHost.addStyles(this.styles);
				}
				destroy() {
					this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles);
				}
			}
			class ZE extends zh {
				constructor(t, n, r, o, i, s, a, u) {
					const c = o + "-" + r.id;
					super(t, n, r, i, s, a, u, c),
						(this.contentAttr = (function LV(e) {
							return "_ngcontent-%COMP%".replace($h, e);
						})(c)),
						(this.hostAttr = (function VV(e) {
							return "_nghost-%COMP%".replace($h, e);
						})(c));
				}
				applyToHost(t) {
					this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
				}
				createElement(t, n) {
					const r = super.createElement(t, n);
					return super.setAttribute(r, this.contentAttr, ""), r;
				}
			}
			let UV = (() => {
				class e extends $E {
					constructor(n) {
						super(n);
					}
					supports(n) {
						return !0;
					}
					addEventListener(n, r, o) {
						return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o);
					}
					removeEventListener(n, r, o) {
						return n.removeEventListener(r, o);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(wt));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			const QE = ["alt", "control", "meta", "shift"],
				$V = {
					"\b": "Backspace",
					"\t": "Tab",
					"\x7f": "Delete",
					"\x1b": "Escape",
					Del: "Delete",
					Esc: "Escape",
					Left: "ArrowLeft",
					Right: "ArrowRight",
					Up: "ArrowUp",
					Down: "ArrowDown",
					Menu: "ContextMenu",
					Scroll: "ScrollLock",
					Win: "OS",
				},
				HV = {
					alt: (e) => e.altKey,
					control: (e) => e.ctrlKey,
					meta: (e) => e.metaKey,
					shift: (e) => e.shiftKey,
				};
			let zV = (() => {
				class e extends $E {
					constructor(n) {
						super(n);
					}
					supports(n) {
						return null != e.parseEventName(n);
					}
					addEventListener(n, r, o) {
						const i = e.parseEventName(r),
							s = e.eventCallback(i.fullKey, o, this.manager.getZone());
						return this.manager
							.getZone()
							.runOutsideAngular(() => Kn().onAndCancel(n, i.domEventName, s));
					}
					static parseEventName(n) {
						const r = n.toLowerCase().split("."),
							o = r.shift();
						if (0 === r.length || ("keydown" !== o && "keyup" !== o)) return null;
						const i = e._normalizeKey(r.pop());
						let s = "",
							a = r.indexOf("code");
						if (
							(a > -1 && (r.splice(a, 1), (s = "code.")),
							QE.forEach((c) => {
								const l = r.indexOf(c);
								l > -1 && (r.splice(l, 1), (s += c + "."));
							}),
							(s += i),
							0 != r.length || 0 === i.length)
						)
							return null;
						const u = {};
						return (u.domEventName = o), (u.fullKey = s), u;
					}
					static matchEventFullKeyCode(n, r) {
						let o = $V[n.key] || n.key,
							i = "";
						return (
							r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
							!(null == o || !o) &&
								((o = o.toLowerCase()),
								" " === o ? (o = "space") : "." === o && (o = "dot"),
								QE.forEach((s) => {
									s !== o && (0, HV[s])(n) && (i += s + ".");
								}),
								(i += o),
								i === r)
						);
					}
					static eventCallback(n, r, o) {
						return (i) => {
							e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
						};
					}
					static _normalizeKey(n) {
						return "esc" === n ? "escape" : n;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(wt));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			const ZV = xw(t1, "browser", [
					{ provide: Un, useValue: NE },
					{
						provide: pm,
						useValue: function GV() {
							Vh.makeCurrent();
						},
						multi: !0,
					},
					{
						provide: wt,
						useFactory: function WV() {
							return (
								(function CS(e) {
									Ol = e;
								})(document),
								document
							);
						},
						deps: [],
					},
				]),
				QV = new b(""),
				JE = [
					{
						provide: Hu,
						useClass: class RV {
							addToWindow(t) {
								(K.getAngularTestability = (r, o = !0) => {
									const i = t.findTestabilityInTree(r, o);
									if (null == i) throw new _(5103, !1);
									return i;
								}),
									(K.getAllAngularTestabilities = () => t.getAllTestabilities()),
									(K.getAllAngularRootElements = () => t.getAllRootElements()),
									K.frameworkStabilizers || (K.frameworkStabilizers = []),
									K.frameworkStabilizers.push((r) => {
										const o = K.getAllAngularTestabilities();
										let i = o.length;
										const s = function () {
											i--, 0 == i && r();
										};
										o.forEach((a) => {
											a.whenStable(s);
										});
									});
							}
							findTestabilityInTree(t, n, r) {
								return null == n
									? null
									: t.getTestability(n) ??
											(r
												? Kn().isShadowRoot(n)
													? this.findTestabilityInTree(t, n.host, !0)
													: this.findTestabilityInTree(t, n.parentElement, !0)
												: null);
							}
						},
						deps: [],
					},
					{ provide: _w, useClass: sh, deps: [Y, ah, Hu] },
					{ provide: sh, useClass: sh, deps: [Y, ah, Hu] },
				],
				KE = [
					{ provide: id, useValue: "root" },
					{
						provide: En,
						useFactory: function qV() {
							return new En();
						},
						deps: [],
					},
					{ provide: jh, useClass: UV, multi: !0, deps: [wt, Y, Un] },
					{ provide: jh, useClass: zV, multi: !0, deps: [wt] },
					qE,
					HE,
					UE,
					{ provide: Sy, useExisting: qE },
					{ provide: xE, useClass: xV, deps: [] },
					[],
				];
			let YV = (() => {
					class e {
						constructor(n) {}
						static withServerTransition(n) {
							return { ngModule: e, providers: [{ provide: _a, useValue: n.appId }] };
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(QV, 12));
						});
						static #t = (this.ɵmod = Yt({ type: e }));
						static #n = (this.ɵinj = Bt({ providers: [...KE, ...JE], imports: [AE, n1] }));
					}
					return e;
				})(),
				XV = (() => {
					class e {
						constructor(n) {
							this._doc = n;
						}
						getTitle() {
							return this._doc.title;
						}
						setTitle(n) {
							this._doc.title = n || "";
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(wt));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			function er(e) {
				return this instanceof er ? ((this.v = e), this) : new er(e);
			}
			function sb(e) {
				if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
				var n,
					t = e[Symbol.asyncIterator];
				return t
					? t.call(e)
					: ((e = (function Zh(e) {
							var t = "function" == typeof Symbol && Symbol.iterator,
								n = t && e[t],
								r = 0;
							if (n) return n.call(e);
							if (e && "number" == typeof e.length)
								return {
									next: function () {
										return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
									},
								};
							throw new TypeError(
								t ? "Object is not iterable." : "Symbol.iterator is not defined.",
							);
					  })(e)),
					  (n = {}),
					  r("next"),
					  r("throw"),
					  r("return"),
					  (n[Symbol.asyncIterator] = function () {
							return this;
					  }),
					  n);
				function r(i) {
					n[i] =
						e[i] &&
						function (s) {
							return new Promise(function (a, u) {
								!(function o(i, s, a, u) {
									Promise.resolve(u).then(function (c) {
										i({ value: c, done: a });
									}, s);
								})(a, u, (s = e[i](s)).done, s.value);
							});
						};
				}
			}
			"function" == typeof SuppressedError && SuppressedError;
			const ab = (e) => e && "number" == typeof e.length && "function" != typeof e;
			function ub(e) {
				return pe(e?.then);
			}
			function cb(e) {
				return pe(e[sl]);
			}
			function lb(e) {
				return Symbol.asyncIterator && pe(e?.[Symbol.asyncIterator]);
			}
			function db(e) {
				return new TypeError(
					`You provided ${
						null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
					} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
				);
			}
			const fb = (function w2() {
				return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
			})();
			function hb(e) {
				return pe(e?.[fb]);
			}
			function pb(e) {
				return (function ib(e, t, n) {
					if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
					var o,
						r = n.apply(e, t || []),
						i = [];
					return (
						(o = {}),
						s("next"),
						s("throw"),
						s("return"),
						(o[Symbol.asyncIterator] = function () {
							return this;
						}),
						o
					);
					function s(f) {
						r[f] &&
							(o[f] = function (h) {
								return new Promise(function (p, g) {
									i.push([f, h, p, g]) > 1 || a(f, h);
								});
							});
					}
					function a(f, h) {
						try {
							!(function u(f) {
								f.value instanceof er ? Promise.resolve(f.value.v).then(c, l) : d(i[0][2], f);
							})(r[f](h));
						} catch (p) {
							d(i[0][3], p);
						}
					}
					function c(f) {
						a("next", f);
					}
					function l(f) {
						a("throw", f);
					}
					function d(f, h) {
						f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
					}
				})(this, arguments, function* () {
					const n = e.getReader();
					try {
						for (;;) {
							const { value: r, done: o } = yield er(n.read());
							if (o) return yield er(void 0);
							yield yield er(r);
						}
					} finally {
						n.releaseLock();
					}
				});
			}
			function gb(e) {
				return pe(e?.getReader);
			}
			function cn(e) {
				if (e instanceof Se) return e;
				if (null != e) {
					if (cb(e))
						return (function E2(e) {
							return new Se((t) => {
								const n = e[sl]();
								if (pe(n.subscribe)) return n.subscribe(t);
								throw new TypeError(
									"Provided object does not correctly implement Symbol.observable",
								);
							});
						})(e);
					if (ab(e))
						return (function b2(e) {
							return new Se((t) => {
								for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
								t.complete();
							});
						})(e);
					if (ub(e))
						return (function I2(e) {
							return new Se((t) => {
								e.then(
									(n) => {
										t.closed || (t.next(n), t.complete());
									},
									(n) => t.error(n),
								).then(null, mg);
							});
						})(e);
					if (lb(e)) return mb(e);
					if (hb(e))
						return (function M2(e) {
							return new Se((t) => {
								for (const n of e) if ((t.next(n), t.closed)) return;
								t.complete();
							});
						})(e);
					if (gb(e))
						return (function S2(e) {
							return mb(pb(e));
						})(e);
				}
				throw db(e);
			}
			function mb(e) {
				return new Se((t) => {
					(function T2(e, t) {
						var n, r, o, i;
						return (function rb(e, t, n, r) {
							return new (n || (n = Promise))(function (i, s) {
								function a(l) {
									try {
										c(r.next(l));
									} catch (d) {
										s(d);
									}
								}
								function u(l) {
									try {
										c(r.throw(l));
									} catch (d) {
										s(d);
									}
								}
								function c(l) {
									l.done
										? i(l.value)
										: (function o(i) {
												return i instanceof n
													? i
													: new n(function (s) {
															s(i);
													  });
										  })(l.value).then(a, u);
								}
								c((r = r.apply(e, t || [])).next());
							});
						})(this, void 0, void 0, function* () {
							try {
								for (n = sb(e); !(r = yield n.next()).done; )
									if ((t.next(r.value), t.closed)) return;
							} catch (s) {
								o = { error: s };
							} finally {
								try {
									r && !r.done && (i = n.return) && (yield i.call(n));
								} finally {
									if (o) throw o.error;
								}
							}
							t.complete();
						});
					})(e, t).catch((n) => t.error(n));
				});
			}
			function xn(e, t, n, r = 0, o = !1) {
				const i = t.schedule(function () {
					n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
				}, r);
				if ((e.add(i), !o)) return i;
			}
			function vb(e, t = 0) {
				return Ue((n, r) => {
					n.subscribe(
						Re(
							r,
							(o) => xn(r, e, () => r.next(o), t),
							() => xn(r, e, () => r.complete(), t),
							(o) => xn(r, e, () => r.error(o), t),
						),
					);
				});
			}
			function yb(e, t = 0) {
				return Ue((n, r) => {
					r.add(e.schedule(() => n.subscribe(r), t));
				});
			}
			function Db(e, t) {
				if (!e) throw new Error("Iterable cannot be null");
				return new Se((n) => {
					xn(n, t, () => {
						const r = e[Symbol.asyncIterator]();
						xn(
							n,
							t,
							() => {
								r.next().then((o) => {
									o.done ? n.complete() : n.next(o.value);
								});
							},
							0,
							!0,
						);
					});
				});
			}
			function Ne(e, t) {
				return t
					? (function P2(e, t) {
							if (null != e) {
								if (cb(e))
									return (function A2(e, t) {
										return cn(e).pipe(yb(t), vb(t));
									})(e, t);
								if (ab(e))
									return (function R2(e, t) {
										return new Se((n) => {
											let r = 0;
											return t.schedule(function () {
												r === e.length
													? n.complete()
													: (n.next(e[r++]), n.closed || this.schedule());
											});
										});
									})(e, t);
								if (ub(e))
									return (function N2(e, t) {
										return cn(e).pipe(yb(t), vb(t));
									})(e, t);
								if (lb(e)) return Db(e, t);
								if (hb(e))
									return (function x2(e, t) {
										return new Se((n) => {
											let r;
											return (
												xn(n, t, () => {
													(r = e[fb]()),
														xn(
															n,
															t,
															() => {
																let o, i;
																try {
																	({ value: o, done: i } = r.next());
																} catch (s) {
																	return void n.error(s);
																}
																i ? n.complete() : n.next(o);
															},
															0,
															!0,
														);
												}),
												() => pe(r?.return) && r.return()
											);
										});
									})(e, t);
								if (gb(e))
									return (function O2(e, t) {
										return Db(pb(e), t);
									})(e, t);
							}
							throw db(e);
					  })(e, t)
					: cn(e);
			}
			const { isArray: F2 } = Array,
				{ getPrototypeOf: k2, prototype: L2, keys: V2 } = Object;
			function _b(e) {
				if (1 === e.length) {
					const t = e[0];
					if (F2(t)) return { args: t, keys: null };
					if (
						(function j2(e) {
							return e && "object" == typeof e && k2(e) === L2;
						})(t)
					) {
						const n = V2(t);
						return { args: n.map((r) => t[r]), keys: n };
					}
				}
				return { args: e, keys: null };
			}
			function Qh(e) {
				return e[e.length - 1];
			}
			function Cb(e) {
				return pe(Qh(e)) ? e.pop() : void 0;
			}
			function hc(e) {
				return (function B2(e) {
					return e && pe(e.schedule);
				})(Qh(e))
					? e.pop()
					: void 0;
			}
			const { isArray: U2 } = Array;
			function wb(e) {
				return z((t) =>
					(function $2(e, t) {
						return U2(t) ? e(...t) : e(t);
					})(e, t),
				);
			}
			function Eb(e, t) {
				return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
			}
			const Xo = new b("CallSetDisabledState", { providedIn: "root", factory: () => Dc }),
				Dc = "always";
			Promise.resolve(), Promise.resolve();
			let jj = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵmod = Yt({ type: e }));
						static #n = (this.ɵinj = Bt({}));
					}
					return e;
				})(),
				Uj = (() => {
					class e {
						static withConfig(n) {
							return {
								ngModule: e,
								providers: [{ provide: Xo, useValue: n.callSetDisabledState ?? Dc }],
							};
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵmod = Yt({ type: e }));
						static #n = (this.ɵinj = Bt({ imports: [jj] }));
					}
					return e;
				})();
			function O(...e) {
				return Ne(e, hc(e));
			}
			function Ke(e, t, n = 1 / 0) {
				return pe(t)
					? Ke((r, o) => z((i, s) => t(r, i, o, s))(cn(e(r, o))), n)
					: ("number" == typeof t && (n = t),
					  Ue((r, o) =>
							(function $j(e, t, n, r, o, i, s, a) {
								const u = [];
								let c = 0,
									l = 0,
									d = !1;
								const f = () => {
										d && !u.length && !c && t.complete();
									},
									h = (g) => (c < r ? p(g) : u.push(g)),
									p = (g) => {
										i && t.next(g), c++;
										let m = !1;
										cn(n(g, l++)).subscribe(
											Re(
												t,
												(D) => {
													o?.(D), i ? h(D) : t.next(D);
												},
												() => {
													m = !0;
												},
												void 0,
												() => {
													if (m)
														try {
															for (c--; u.length && c < r; ) {
																const D = u.shift();
																s ? xn(t, s, () => p(D)) : p(D);
															}
															f();
														} catch (D) {
															t.error(D);
														}
												},
											),
										);
									};
								return (
									e.subscribe(
										Re(t, h, () => {
											(d = !0), f();
										}),
									),
									() => {
										a?.();
									}
								);
							})(r, o, e, n),
					  ));
			}
			function Jo(e, t) {
				return pe(t) ? Ke(e, t, 1) : Ke(e, 1);
			}
			function On(e, t) {
				return Ue((n, r) => {
					let o = 0;
					n.subscribe(Re(r, (i) => e.call(t, i, o++) && r.next(i)));
				});
			}
			function Fs(e) {
				return Ue((t, n) => {
					try {
						t.subscribe(n);
					} finally {
						n.add(e);
					}
				});
			}
			function qt(e, t) {
				return Ue((n, r) => {
					let o = null,
						i = 0,
						s = !1;
					const a = () => s && !o && r.complete();
					n.subscribe(
						Re(
							r,
							(u) => {
								o?.unsubscribe();
								let c = 0;
								const l = i++;
								cn(e(u, l)).subscribe(
									(o = Re(
										r,
										(d) => r.next(t ? t(u, d, l, c++) : d),
										() => {
											(o = null), a();
										},
									)),
								);
							},
							() => {
								(s = !0), a();
							},
						),
					);
				});
			}
			class bc {}
			class Ic {}
			class Rt {
				constructor(t) {
					(this.normalizedNames = new Map()),
						(this.lazyUpdate = null),
						t
							? "string" == typeof t
								? (this.lazyInit = () => {
										(this.headers = new Map()),
											t.split("\n").forEach((n) => {
												const r = n.indexOf(":");
												if (r > 0) {
													const o = n.slice(0, r),
														i = o.toLowerCase(),
														s = n.slice(r + 1).trim();
													this.maybeSetNormalizedName(o, i),
														this.headers.has(i)
															? this.headers.get(i).push(s)
															: this.headers.set(i, [s]);
												}
											});
								  })
								: typeof Headers < "u" && t instanceof Headers
								? ((this.headers = new Map()),
								  t.forEach((n, r) => {
										this.setHeaderEntries(r, n);
								  }))
								: (this.lazyInit = () => {
										(this.headers = new Map()),
											Object.entries(t).forEach(([n, r]) => {
												this.setHeaderEntries(n, r);
											});
								  })
							: (this.headers = new Map());
				}
				has(t) {
					return this.init(), this.headers.has(t.toLowerCase());
				}
				get(t) {
					this.init();
					const n = this.headers.get(t.toLowerCase());
					return n && n.length > 0 ? n[0] : null;
				}
				keys() {
					return this.init(), Array.from(this.normalizedNames.values());
				}
				getAll(t) {
					return this.init(), this.headers.get(t.toLowerCase()) || null;
				}
				append(t, n) {
					return this.clone({ name: t, value: n, op: "a" });
				}
				set(t, n) {
					return this.clone({ name: t, value: n, op: "s" });
				}
				delete(t, n) {
					return this.clone({ name: t, value: n, op: "d" });
				}
				maybeSetNormalizedName(t, n) {
					this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
				}
				init() {
					this.lazyInit &&
						(this.lazyInit instanceof Rt ? this.copyFrom(this.lazyInit) : this.lazyInit(),
						(this.lazyInit = null),
						this.lazyUpdate &&
							(this.lazyUpdate.forEach((t) => this.applyUpdate(t)), (this.lazyUpdate = null)));
				}
				copyFrom(t) {
					t.init(),
						Array.from(t.headers.keys()).forEach((n) => {
							this.headers.set(n, t.headers.get(n)),
								this.normalizedNames.set(n, t.normalizedNames.get(n));
						});
				}
				clone(t) {
					const n = new Rt();
					return (
						(n.lazyInit = this.lazyInit && this.lazyInit instanceof Rt ? this.lazyInit : this),
						(n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
						n
					);
				}
				applyUpdate(t) {
					const n = t.name.toLowerCase();
					switch (t.op) {
						case "a":
						case "s":
							let r = t.value;
							if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
							this.maybeSetNormalizedName(t.name, n);
							const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
							o.push(...r), this.headers.set(n, o);
							break;
						case "d":
							const i = t.value;
							if (i) {
								let s = this.headers.get(n);
								if (!s) return;
								(s = s.filter((a) => -1 === i.indexOf(a))),
									0 === s.length
										? (this.headers.delete(n), this.normalizedNames.delete(n))
										: this.headers.set(n, s);
							} else this.headers.delete(n), this.normalizedNames.delete(n);
					}
				}
				setHeaderEntries(t, n) {
					const r = (Array.isArray(n) ? n : [n]).map((i) => i.toString()),
						o = t.toLowerCase();
					this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
				}
				forEach(t) {
					this.init(),
						Array.from(this.normalizedNames.keys()).forEach((n) =>
							t(this.normalizedNames.get(n), this.headers.get(n)),
						);
				}
			}
			class Hj {
				encodeKey(t) {
					return SI(t);
				}
				encodeValue(t) {
					return SI(t);
				}
				decodeKey(t) {
					return decodeURIComponent(t);
				}
				decodeValue(t) {
					return decodeURIComponent(t);
				}
			}
			const Gj = /%(\d[a-f0-9])/gi,
				qj = { 40: "@", "3A": ":", 24: "$", "2C": ",", "3B": ";", "3D": "=", "3F": "?", "2F": "/" };
			function SI(e) {
				return encodeURIComponent(e).replace(Gj, (t, n) => qj[n] ?? t);
			}
			function Mc(e) {
				return `${e}`;
			}
			class or {
				constructor(t = {}) {
					if (
						((this.updates = null),
						(this.cloneFrom = null),
						(this.encoder = t.encoder || new Hj()),
						t.fromString)
					) {
						if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
						this.map = (function zj(e, t) {
							const n = new Map();
							return (
								e.length > 0 &&
									e
										.replace(/^\?/, "")
										.split("&")
										.forEach((o) => {
											const i = o.indexOf("="),
												[s, a] =
													-1 == i
														? [t.decodeKey(o), ""]
														: [t.decodeKey(o.slice(0, i)), t.decodeValue(o.slice(i + 1))],
												u = n.get(s) || [];
											u.push(a), n.set(s, u);
										}),
								n
							);
						})(t.fromString, this.encoder);
					} else
						t.fromObject
							? ((this.map = new Map()),
							  Object.keys(t.fromObject).forEach((n) => {
									const r = t.fromObject[n],
										o = Array.isArray(r) ? r.map(Mc) : [Mc(r)];
									this.map.set(n, o);
							  }))
							: (this.map = null);
				}
				has(t) {
					return this.init(), this.map.has(t);
				}
				get(t) {
					this.init();
					const n = this.map.get(t);
					return n ? n[0] : null;
				}
				getAll(t) {
					return this.init(), this.map.get(t) || null;
				}
				keys() {
					return this.init(), Array.from(this.map.keys());
				}
				append(t, n) {
					return this.clone({ param: t, value: n, op: "a" });
				}
				appendAll(t) {
					const n = [];
					return (
						Object.keys(t).forEach((r) => {
							const o = t[r];
							Array.isArray(o)
								? o.forEach((i) => {
										n.push({ param: r, value: i, op: "a" });
								  })
								: n.push({ param: r, value: o, op: "a" });
						}),
						this.clone(n)
					);
				}
				set(t, n) {
					return this.clone({ param: t, value: n, op: "s" });
				}
				delete(t, n) {
					return this.clone({ param: t, value: n, op: "d" });
				}
				toString() {
					return (
						this.init(),
						this.keys()
							.map((t) => {
								const n = this.encoder.encodeKey(t);
								return this.map
									.get(t)
									.map((r) => n + "=" + this.encoder.encodeValue(r))
									.join("&");
							})
							.filter((t) => "" !== t)
							.join("&")
					);
				}
				clone(t) {
					const n = new or({ encoder: this.encoder });
					return (
						(n.cloneFrom = this.cloneFrom || this), (n.updates = (this.updates || []).concat(t)), n
					);
				}
				init() {
					null === this.map && (this.map = new Map()),
						null !== this.cloneFrom &&
							(this.cloneFrom.init(),
							this.cloneFrom.keys().forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
							this.updates.forEach((t) => {
								switch (t.op) {
									case "a":
									case "s":
										const n = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
										n.push(Mc(t.value)), this.map.set(t.param, n);
										break;
									case "d":
										if (void 0 === t.value) {
											this.map.delete(t.param);
											break;
										}
										{
											let r = this.map.get(t.param) || [];
											const o = r.indexOf(Mc(t.value));
											-1 !== o && r.splice(o, 1),
												r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param);
										}
								}
							}),
							(this.cloneFrom = this.updates = null));
				}
			}
			class Wj {
				constructor() {
					this.map = new Map();
				}
				set(t, n) {
					return this.map.set(t, n), this;
				}
				get(t) {
					return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
				}
				delete(t) {
					return this.map.delete(t), this;
				}
				has(t) {
					return this.map.has(t);
				}
				keys() {
					return this.map.keys();
				}
			}
			function TI(e) {
				return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
			}
			function AI(e) {
				return typeof Blob < "u" && e instanceof Blob;
			}
			function NI(e) {
				return typeof FormData < "u" && e instanceof FormData;
			}
			class ks {
				constructor(t, n, r, o) {
					let i;
					if (
						((this.url = n),
						(this.body = null),
						(this.reportProgress = !1),
						(this.withCredentials = !1),
						(this.responseType = "json"),
						(this.method = t.toUpperCase()),
						(function Zj(e) {
							switch (e) {
								case "DELETE":
								case "GET":
								case "HEAD":
								case "OPTIONS":
								case "JSONP":
									return !1;
								default:
									return !0;
							}
						})(this.method) || o
							? ((this.body = void 0 !== r ? r : null), (i = o))
							: (i = r),
						i &&
							((this.reportProgress = !!i.reportProgress),
							(this.withCredentials = !!i.withCredentials),
							i.responseType && (this.responseType = i.responseType),
							i.headers && (this.headers = i.headers),
							i.context && (this.context = i.context),
							i.params && (this.params = i.params),
							(this.transferCache = i.transferCache)),
						(this.headers ??= new Rt()),
						(this.context ??= new Wj()),
						this.params)
					) {
						const s = this.params.toString();
						if (0 === s.length) this.urlWithParams = n;
						else {
							const a = n.indexOf("?");
							this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
						}
					} else (this.params = new or()), (this.urlWithParams = n);
				}
				serializeBody() {
					return null === this.body
						? null
						: TI(this.body) ||
						  AI(this.body) ||
						  NI(this.body) ||
						  (function Qj(e) {
								return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
						  })(this.body) ||
						  "string" == typeof this.body
						? this.body
						: this.body instanceof or
						? this.body.toString()
						: "object" == typeof this.body ||
						  "boolean" == typeof this.body ||
						  Array.isArray(this.body)
						? JSON.stringify(this.body)
						: this.body.toString();
				}
				detectContentTypeHeader() {
					return null === this.body || NI(this.body)
						? null
						: AI(this.body)
						? this.body.type || null
						: TI(this.body)
						? null
						: "string" == typeof this.body
						? "text/plain"
						: this.body instanceof or
						? "application/x-www-form-urlencoded;charset=UTF-8"
						: "object" == typeof this.body ||
						  "number" == typeof this.body ||
						  "boolean" == typeof this.body
						? "application/json"
						: null;
				}
				clone(t = {}) {
					const n = t.method || this.method,
						r = t.url || this.url,
						o = t.responseType || this.responseType,
						i = void 0 !== t.body ? t.body : this.body,
						s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
						a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
					let u = t.headers || this.headers,
						c = t.params || this.params;
					const l = t.context ?? this.context;
					return (
						void 0 !== t.setHeaders &&
							(u = Object.keys(t.setHeaders).reduce((d, f) => d.set(f, t.setHeaders[f]), u)),
						t.setParams &&
							(c = Object.keys(t.setParams).reduce((d, f) => d.set(f, t.setParams[f]), c)),
						new ks(n, r, i, {
							params: c,
							headers: u,
							context: l,
							reportProgress: a,
							responseType: o,
							withCredentials: s,
						})
					);
				}
			}
			var ir = (function (e) {
				return (
					(e[(e.Sent = 0)] = "Sent"),
					(e[(e.UploadProgress = 1)] = "UploadProgress"),
					(e[(e.ResponseHeader = 2)] = "ResponseHeader"),
					(e[(e.DownloadProgress = 3)] = "DownloadProgress"),
					(e[(e.Response = 4)] = "Response"),
					(e[(e.User = 5)] = "User"),
					e
				);
			})(ir || {});
			class vp {
				constructor(t, n = Ls.Ok, r = "OK") {
					(this.headers = t.headers || new Rt()),
						(this.status = void 0 !== t.status ? t.status : n),
						(this.statusText = t.statusText || r),
						(this.url = t.url || null),
						(this.ok = this.status >= 200 && this.status < 300);
				}
			}
			class Sc extends vp {
				constructor(t = {}) {
					super(t), (this.type = ir.ResponseHeader);
				}
				clone(t = {}) {
					return new Sc({
						headers: t.headers || this.headers,
						status: void 0 !== t.status ? t.status : this.status,
						statusText: t.statusText || this.statusText,
						url: t.url || this.url || void 0,
					});
				}
			}
			class kr extends vp {
				constructor(t = {}) {
					super(t), (this.type = ir.Response), (this.body = void 0 !== t.body ? t.body : null);
				}
				clone(t = {}) {
					return new kr({
						body: void 0 !== t.body ? t.body : this.body,
						headers: t.headers || this.headers,
						status: void 0 !== t.status ? t.status : this.status,
						statusText: t.statusText || this.statusText,
						url: t.url || this.url || void 0,
					});
				}
			}
			class Ko extends vp {
				constructor(t) {
					super(t, 0, "Unknown Error"),
						(this.name = "HttpErrorResponse"),
						(this.ok = !1),
						(this.message =
							this.status >= 200 && this.status < 300
								? `Http failure during parsing for ${t.url || "(unknown url)"}`
								: `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${
										t.statusText
								  }`),
						(this.error = t.error || null);
				}
			}
			var Ls = (function (e) {
				return (
					(e[(e.Continue = 100)] = "Continue"),
					(e[(e.SwitchingProtocols = 101)] = "SwitchingProtocols"),
					(e[(e.Processing = 102)] = "Processing"),
					(e[(e.EarlyHints = 103)] = "EarlyHints"),
					(e[(e.Ok = 200)] = "Ok"),
					(e[(e.Created = 201)] = "Created"),
					(e[(e.Accepted = 202)] = "Accepted"),
					(e[(e.NonAuthoritativeInformation = 203)] = "NonAuthoritativeInformation"),
					(e[(e.NoContent = 204)] = "NoContent"),
					(e[(e.ResetContent = 205)] = "ResetContent"),
					(e[(e.PartialContent = 206)] = "PartialContent"),
					(e[(e.MultiStatus = 207)] = "MultiStatus"),
					(e[(e.AlreadyReported = 208)] = "AlreadyReported"),
					(e[(e.ImUsed = 226)] = "ImUsed"),
					(e[(e.MultipleChoices = 300)] = "MultipleChoices"),
					(e[(e.MovedPermanently = 301)] = "MovedPermanently"),
					(e[(e.Found = 302)] = "Found"),
					(e[(e.SeeOther = 303)] = "SeeOther"),
					(e[(e.NotModified = 304)] = "NotModified"),
					(e[(e.UseProxy = 305)] = "UseProxy"),
					(e[(e.Unused = 306)] = "Unused"),
					(e[(e.TemporaryRedirect = 307)] = "TemporaryRedirect"),
					(e[(e.PermanentRedirect = 308)] = "PermanentRedirect"),
					(e[(e.BadRequest = 400)] = "BadRequest"),
					(e[(e.Unauthorized = 401)] = "Unauthorized"),
					(e[(e.PaymentRequired = 402)] = "PaymentRequired"),
					(e[(e.Forbidden = 403)] = "Forbidden"),
					(e[(e.NotFound = 404)] = "NotFound"),
					(e[(e.MethodNotAllowed = 405)] = "MethodNotAllowed"),
					(e[(e.NotAcceptable = 406)] = "NotAcceptable"),
					(e[(e.ProxyAuthenticationRequired = 407)] = "ProxyAuthenticationRequired"),
					(e[(e.RequestTimeout = 408)] = "RequestTimeout"),
					(e[(e.Conflict = 409)] = "Conflict"),
					(e[(e.Gone = 410)] = "Gone"),
					(e[(e.LengthRequired = 411)] = "LengthRequired"),
					(e[(e.PreconditionFailed = 412)] = "PreconditionFailed"),
					(e[(e.PayloadTooLarge = 413)] = "PayloadTooLarge"),
					(e[(e.UriTooLong = 414)] = "UriTooLong"),
					(e[(e.UnsupportedMediaType = 415)] = "UnsupportedMediaType"),
					(e[(e.RangeNotSatisfiable = 416)] = "RangeNotSatisfiable"),
					(e[(e.ExpectationFailed = 417)] = "ExpectationFailed"),
					(e[(e.ImATeapot = 418)] = "ImATeapot"),
					(e[(e.MisdirectedRequest = 421)] = "MisdirectedRequest"),
					(e[(e.UnprocessableEntity = 422)] = "UnprocessableEntity"),
					(e[(e.Locked = 423)] = "Locked"),
					(e[(e.FailedDependency = 424)] = "FailedDependency"),
					(e[(e.TooEarly = 425)] = "TooEarly"),
					(e[(e.UpgradeRequired = 426)] = "UpgradeRequired"),
					(e[(e.PreconditionRequired = 428)] = "PreconditionRequired"),
					(e[(e.TooManyRequests = 429)] = "TooManyRequests"),
					(e[(e.RequestHeaderFieldsTooLarge = 431)] = "RequestHeaderFieldsTooLarge"),
					(e[(e.UnavailableForLegalReasons = 451)] = "UnavailableForLegalReasons"),
					(e[(e.InternalServerError = 500)] = "InternalServerError"),
					(e[(e.NotImplemented = 501)] = "NotImplemented"),
					(e[(e.BadGateway = 502)] = "BadGateway"),
					(e[(e.ServiceUnavailable = 503)] = "ServiceUnavailable"),
					(e[(e.GatewayTimeout = 504)] = "GatewayTimeout"),
					(e[(e.HttpVersionNotSupported = 505)] = "HttpVersionNotSupported"),
					(e[(e.VariantAlsoNegotiates = 506)] = "VariantAlsoNegotiates"),
					(e[(e.InsufficientStorage = 507)] = "InsufficientStorage"),
					(e[(e.LoopDetected = 508)] = "LoopDetected"),
					(e[(e.NotExtended = 510)] = "NotExtended"),
					(e[(e.NetworkAuthenticationRequired = 511)] = "NetworkAuthenticationRequired"),
					e
				);
			})(Ls || {});
			function yp(e, t) {
				return {
					body: t,
					headers: e.headers,
					context: e.context,
					observe: e.observe,
					params: e.params,
					reportProgress: e.reportProgress,
					responseType: e.responseType,
					withCredentials: e.withCredentials,
					transferCache: e.transferCache,
				};
			}
			let RI = (() => {
				class e {
					constructor(n) {
						this.handler = n;
					}
					request(n, r, o = {}) {
						let i;
						if (n instanceof ks) i = n;
						else {
							let u, c;
							(u = o.headers instanceof Rt ? o.headers : new Rt(o.headers)),
								o.params &&
									(c = o.params instanceof or ? o.params : new or({ fromObject: o.params })),
								(i = new ks(n, r, void 0 !== o.body ? o.body : null, {
									headers: u,
									context: o.context,
									params: c,
									reportProgress: o.reportProgress,
									responseType: o.responseType || "json",
									withCredentials: o.withCredentials,
									transferCache: o.transferCache,
								}));
						}
						const s = O(i).pipe(Jo((u) => this.handler.handle(u)));
						if (n instanceof ks || "events" === o.observe) return s;
						const a = s.pipe(On((u) => u instanceof kr));
						switch (o.observe || "body") {
							case "body":
								switch (i.responseType) {
									case "arraybuffer":
										return a.pipe(
											z((u) => {
												if (null !== u.body && !(u.body instanceof ArrayBuffer))
													throw new Error("Response is not an ArrayBuffer.");
												return u.body;
											}),
										);
									case "blob":
										return a.pipe(
											z((u) => {
												if (null !== u.body && !(u.body instanceof Blob))
													throw new Error("Response is not a Blob.");
												return u.body;
											}),
										);
									case "text":
										return a.pipe(
											z((u) => {
												if (null !== u.body && "string" != typeof u.body)
													throw new Error("Response is not a string.");
												return u.body;
											}),
										);
									default:
										return a.pipe(z((u) => u.body));
								}
							case "response":
								return a;
							default:
								throw new Error(`Unreachable: unhandled observe type ${o.observe}}`);
						}
					}
					delete(n, r = {}) {
						return this.request("DELETE", n, r);
					}
					get(n, r = {}) {
						return this.request("GET", n, r);
					}
					head(n, r = {}) {
						return this.request("HEAD", n, r);
					}
					jsonp(n, r) {
						return this.request("JSONP", n, {
							params: new or().append(r, "JSONP_CALLBACK"),
							observe: "body",
							responseType: "json",
						});
					}
					options(n, r = {}) {
						return this.request("OPTIONS", n, r);
					}
					patch(n, r, o = {}) {
						return this.request("PATCH", n, yp(o, r));
					}
					post(n, r, o = {}) {
						return this.request("POST", n, yp(o, r));
					}
					put(n, r, o = {}) {
						return this.request("PUT", n, yp(o, r));
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(bc));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			function OI(e, t) {
				return t(e);
			}
			function eB(e, t) {
				return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
			}
			const nB = new b(""),
				Vs = new b(""),
				PI = new b(""),
				FI = new b("");
			function rB() {
				let e = null;
				return (t, n) => {
					null === e && (e = (w(nB, { optional: !0 }) ?? []).reduceRight(eB, OI));
					const r = w(br),
						o = r.add();
					return e(t, n).pipe(Fs(() => r.remove(o)));
				};
			}
			let kI = (() => {
				class e extends bc {
					constructor(n, r) {
						super(),
							(this.backend = n),
							(this.injector = r),
							(this.chain = null),
							(this.pendingTasks = w(br));
						const o = w(FI, { optional: !0 });
						this.backend = o ?? n;
					}
					handle(n) {
						if (null === this.chain) {
							const o = Array.from(
								new Set([...this.injector.get(Vs), ...this.injector.get(PI, [])]),
							);
							this.chain = o.reduceRight(
								(i, s) =>
									(function tB(e, t, n) {
										return (r, o) => Hn(n, () => t(r, (i) => e(i, o)));
									})(i, s, this.injector),
								OI,
							);
						}
						const r = this.pendingTasks.add();
						return this.chain(n, (o) => this.backend.handle(o)).pipe(
							Fs(() => this.pendingTasks.remove(r)),
						);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(Ic), S(_t));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			const uB = /^\)\]\}',?\n/;
			let VI = (() => {
				class e {
					constructor(n) {
						this.xhrFactory = n;
					}
					handle(n) {
						if ("JSONP" === n.method) throw new _(-2800, !1);
						const r = this.xhrFactory;
						return (r.ɵloadImpl ? Ne(r.ɵloadImpl()) : O(null)).pipe(
							qt(
								() =>
									new Se((i) => {
										const s = r.build();
										if (
											(s.open(n.method, n.urlWithParams),
											n.withCredentials && (s.withCredentials = !0),
											n.headers.forEach((g, m) => s.setRequestHeader(g, m.join(","))),
											n.headers.has("Accept") ||
												s.setRequestHeader("Accept", "application/json, text/plain, */*"),
											!n.headers.has("Content-Type"))
										) {
											const g = n.detectContentTypeHeader();
											null !== g && s.setRequestHeader("Content-Type", g);
										}
										if (n.responseType) {
											const g = n.responseType.toLowerCase();
											s.responseType = "json" !== g ? g : "text";
										}
										const a = n.serializeBody();
										let u = null;
										const c = () => {
												if (null !== u) return u;
												const g = s.statusText || "OK",
													m = new Rt(s.getAllResponseHeaders()),
													D =
														(function cB(e) {
															return "responseURL" in e && e.responseURL
																? e.responseURL
																: /^X-Request-URL:/m.test(e.getAllResponseHeaders())
																? e.getResponseHeader("X-Request-URL")
																: null;
														})(s) || n.url;
												return (
													(u = new Sc({ headers: m, status: s.status, statusText: g, url: D })), u
												);
											},
											l = () => {
												let { headers: g, status: m, statusText: D, url: v } = c(),
													I = null;
												m !== Ls.NoContent &&
													(I = typeof s.response > "u" ? s.responseText : s.response),
													0 === m && (m = I ? Ls.Ok : 0);
												let A = m >= 200 && m < 300;
												if ("json" === n.responseType && "string" == typeof I) {
													const F = I;
													I = I.replace(uB, "");
													try {
														I = "" !== I ? JSON.parse(I) : null;
													} catch (re) {
														(I = F), A && ((A = !1), (I = { error: re, text: I }));
													}
												}
												A
													? (i.next(
															new kr({
																body: I,
																headers: g,
																status: m,
																statusText: D,
																url: v || void 0,
															}),
													  ),
													  i.complete())
													: i.error(
															new Ko({
																error: I,
																headers: g,
																status: m,
																statusText: D,
																url: v || void 0,
															}),
													  );
											},
											d = (g) => {
												const { url: m } = c(),
													D = new Ko({
														error: g,
														status: s.status || 0,
														statusText: s.statusText || "Unknown Error",
														url: m || void 0,
													});
												i.error(D);
											};
										let f = !1;
										const h = (g) => {
												f || (i.next(c()), (f = !0));
												let m = { type: ir.DownloadProgress, loaded: g.loaded };
												g.lengthComputable && (m.total = g.total),
													"text" === n.responseType &&
														s.responseText &&
														(m.partialText = s.responseText),
													i.next(m);
											},
											p = (g) => {
												let m = { type: ir.UploadProgress, loaded: g.loaded };
												g.lengthComputable && (m.total = g.total), i.next(m);
											};
										return (
											s.addEventListener("load", l),
											s.addEventListener("error", d),
											s.addEventListener("timeout", d),
											s.addEventListener("abort", d),
											n.reportProgress &&
												(s.addEventListener("progress", h),
												null !== a && s.upload && s.upload.addEventListener("progress", p)),
											s.send(a),
											i.next({ type: ir.Sent }),
											() => {
												s.removeEventListener("error", d),
													s.removeEventListener("abort", d),
													s.removeEventListener("load", l),
													s.removeEventListener("timeout", d),
													n.reportProgress &&
														(s.removeEventListener("progress", h),
														null !== a && s.upload && s.upload.removeEventListener("progress", p)),
													s.readyState !== s.DONE && s.abort();
											}
										);
									}),
							),
						);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(xE));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			const Cp = new b(""),
				jI = new b("", { providedIn: "root", factory: () => "XSRF-TOKEN" }),
				BI = new b("", { providedIn: "root", factory: () => "X-XSRF-TOKEN" });
			class UI {}
			let fB = (() => {
				class e {
					constructor(n, r, o) {
						(this.doc = n),
							(this.platform = r),
							(this.cookieName = o),
							(this.lastCookieString = ""),
							(this.lastToken = null),
							(this.parseCount = 0);
					}
					getToken() {
						if ("server" === this.platform) return null;
						const n = this.doc.cookie || "";
						return (
							n !== this.lastCookieString &&
								(this.parseCount++,
								(this.lastToken = yE(n, this.cookieName)),
								(this.lastCookieString = n)),
							this.lastToken
						);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(wt), S(Un), S(jI));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			function hB(e, t) {
				const n = e.url.toLowerCase();
				if (
					!w(Cp) ||
					"GET" === e.method ||
					"HEAD" === e.method ||
					n.startsWith("http://") ||
					n.startsWith("https://")
				)
					return t(e);
				const r = w(UI).getToken(),
					o = w(BI);
				return (
					null != r && !e.headers.has(o) && (e = e.clone({ headers: e.headers.set(o, r) })), t(e)
				);
			}
			var sr = (function (e) {
				return (
					(e[(e.Interceptors = 0)] = "Interceptors"),
					(e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
					(e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
					(e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
					(e[(e.JsonpSupport = 4)] = "JsonpSupport"),
					(e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
					(e[(e.Fetch = 6)] = "Fetch"),
					e
				);
			})(sr || {});
			function pB(...e) {
				const t = [
					RI,
					VI,
					kI,
					{ provide: bc, useExisting: kI },
					{ provide: Ic, useExisting: VI },
					{ provide: Vs, useValue: hB, multi: !0 },
					{ provide: Cp, useValue: !0 },
					{ provide: UI, useClass: fB },
				];
				for (const n of e) t.push(...n.ɵproviders);
				return (function xa(e) {
					return { ɵproviders: e };
				})(t);
			}
			const $I = new b("");
			function gB() {
				return (function Lr(e, t) {
					return { ɵkind: e, ɵproviders: t };
				})(sr.LegacyInterceptors, [
					{ provide: $I, useFactory: rB },
					{ provide: Vs, useExisting: $I, multi: !0 },
				]);
			}
			let mB = (() => {
				class e {
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵmod = Yt({ type: e }));
					static #n = (this.ɵinj = Bt({ providers: [pB(gB())] }));
				}
				return e;
			})();
			function wp(...e) {
				const t = hc(e),
					n = Cb(e),
					{ args: r, keys: o } = _b(e);
				if (0 === r.length) return Ne([], t);
				const i = new Se(
					(function EB(e, t, n = dr) {
						return (r) => {
							QI(
								t,
								() => {
									const { length: o } = e,
										i = new Array(o);
									let s = o,
										a = o;
									for (let u = 0; u < o; u++)
										QI(
											t,
											() => {
												const c = Ne(e[u], t);
												let l = !1;
												c.subscribe(
													Re(
														r,
														(d) => {
															(i[u] = d), l || ((l = !0), a--), a || r.next(n(i.slice()));
														},
														() => {
															--s || r.complete();
														},
													),
												);
											},
											r,
										);
								},
								r,
							);
						};
					})(r, t, o ? (s) => Eb(o, s) : dr),
				);
				return n ? i.pipe(wb(n)) : i;
			}
			function QI(e, t, n) {
				e ? xn(n, e, t) : t();
			}
			const Ac = Xc(
				(e) =>
					function () {
						e(this), (this.name = "EmptyError"), (this.message = "no elements in sequence");
					},
			);
			function js(e = 1 / 0) {
				return Ke(dr, e);
			}
			function Ep(...e) {
				return (function bB() {
					return js(1);
				})()(Ne(e, hc(e)));
			}
			function YI(e) {
				return new Se((t) => {
					cn(e()).subscribe(t);
				});
			}
			function Nc(e, t) {
				const n = pe(e) ? e : () => e,
					r = (o) => o.error(n());
				return new Se(t ? (o) => t.schedule(r, 0, o) : r);
			}
			const Pn = new Se((e) => e.complete());
			function bp() {
				return Ue((e, t) => {
					let n = null;
					e._refCount++;
					const r = Re(t, void 0, void 0, void 0, () => {
						if (!e || e._refCount <= 0 || 0 < --e._refCount) return void (n = null);
						const o = e._connection,
							i = n;
						(n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
					});
					e.subscribe(r), r.closed || (n = e.connect());
				});
			}
			class XI extends Se {
				constructor(t, n) {
					super(),
						(this.source = t),
						(this.subjectFactory = n),
						(this._subject = null),
						(this._refCount = 0),
						(this._connection = null),
						_g(t) && (this.lift = t.lift);
				}
				_subscribe(t) {
					return this.getSubject().subscribe(t);
				}
				getSubject() {
					const t = this._subject;
					return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject;
				}
				_teardown() {
					this._refCount = 0;
					const { _connection: t } = this;
					(this._subject = this._connection = null), t?.unsubscribe();
				}
				connect() {
					let t = this._connection;
					if (!t) {
						t = this._connection = new at();
						const n = this.getSubject();
						t.add(
							this.source.subscribe(
								Re(
									n,
									void 0,
									() => {
										this._teardown(), n.complete();
									},
									(r) => {
										this._teardown(), n.error(r);
									},
									() => this._teardown(),
								),
							),
						),
							t.closed && ((this._connection = null), (t = at.EMPTY));
					}
					return t;
				}
				refCount() {
					return bp()(this);
				}
			}
			function ei(e) {
				return e <= 0
					? () => Pn
					: Ue((t, n) => {
							let r = 0;
							t.subscribe(
								Re(n, (o) => {
									++r <= e && (n.next(o), e <= r && n.complete());
								}),
							);
					  });
			}
			function Rc(e) {
				return Ue((t, n) => {
					let r = !1;
					t.subscribe(
						Re(
							n,
							(o) => {
								(r = !0), n.next(o);
							},
							() => {
								r || n.next(e), n.complete();
							},
						),
					);
				});
			}
			function JI(e = SB) {
				return Ue((t, n) => {
					let r = !1;
					t.subscribe(
						Re(
							n,
							(o) => {
								(r = !0), n.next(o);
							},
							() => (r ? n.complete() : n.error(e())),
						),
					);
				});
			}
			function SB() {
				return new Ac();
			}
			function Vr(e, t) {
				const n = arguments.length >= 2;
				return (r) =>
					r.pipe(e ? On((o, i) => e(o, i, r)) : dr, ei(1), n ? Rc(t) : JI(() => new Ac()));
			}
			function et(e, t, n) {
				const r = pe(e) || t || n ? { next: e, error: t, complete: n } : e;
				return r
					? Ue((o, i) => {
							var s;
							null === (s = r.subscribe) || void 0 === s || s.call(r);
							let a = !0;
							o.subscribe(
								Re(
									i,
									(u) => {
										var c;
										null === (c = r.next) || void 0 === c || c.call(r, u), i.next(u);
									},
									() => {
										var u;
										(a = !1), null === (u = r.complete) || void 0 === u || u.call(r), i.complete();
									},
									(u) => {
										var c;
										(a = !1), null === (c = r.error) || void 0 === c || c.call(r, u), i.error(u);
									},
									() => {
										var u, c;
										a && (null === (u = r.unsubscribe) || void 0 === u || u.call(r)),
											null === (c = r.finalize) || void 0 === c || c.call(r);
									},
								),
							);
					  })
					: dr;
			}
			function ti(e) {
				return Ue((t, n) => {
					let i,
						r = null,
						o = !1;
					(r = t.subscribe(
						Re(n, void 0, void 0, (s) => {
							(i = cn(e(s, ti(e)(t)))),
								r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
						}),
					)),
						o && (r.unsubscribe(), (r = null), i.subscribe(n));
				});
			}
			function Ip(e) {
				return e <= 0
					? () => Pn
					: Ue((t, n) => {
							let r = [];
							t.subscribe(
								Re(
									n,
									(o) => {
										r.push(o), e < r.length && r.shift();
									},
									() => {
										for (const o of r) n.next(o);
										n.complete();
									},
									void 0,
									() => {
										r = null;
									},
								),
							);
					  });
			}
			const B = "primary",
				Bs = Symbol("RouteTitle");
			class OB {
				constructor(t) {
					this.params = t || {};
				}
				has(t) {
					return Object.prototype.hasOwnProperty.call(this.params, t);
				}
				get(t) {
					if (this.has(t)) {
						const n = this.params[t];
						return Array.isArray(n) ? n[0] : n;
					}
					return null;
				}
				getAll(t) {
					if (this.has(t)) {
						const n = this.params[t];
						return Array.isArray(n) ? n : [n];
					}
					return [];
				}
				get keys() {
					return Object.keys(this.params);
				}
			}
			function ni(e) {
				return new OB(e);
			}
			function PB(e, t, n) {
				const r = n.path.split("/");
				if (
					r.length > e.length ||
					("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
				)
					return null;
				const o = {};
				for (let i = 0; i < r.length; i++) {
					const s = r[i],
						a = e[i];
					if (s.startsWith(":")) o[s.substring(1)] = a;
					else if (s !== a.path) return null;
				}
				return { consumed: e.slice(0, r.length), posParams: o };
			}
			function dn(e, t) {
				const n = e ? Mp(e) : void 0,
					r = t ? Mp(t) : void 0;
				if (!n || !r || n.length != r.length) return !1;
				let o;
				for (let i = 0; i < n.length; i++) if (((o = n[i]), !KI(e[o], t[o]))) return !1;
				return !0;
			}
			function Mp(e) {
				return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
			}
			function KI(e, t) {
				if (Array.isArray(e) && Array.isArray(t)) {
					if (e.length !== t.length) return !1;
					const n = [...e].sort(),
						r = [...t].sort();
					return n.every((o, i) => r[i] === o);
				}
				return e === t;
			}
			function eM(e) {
				return e.length > 0 ? e[e.length - 1] : null;
			}
			function ar(e) {
				return (function wB(e) {
					return !!e && (e instanceof Se || (pe(e.lift) && pe(e.subscribe)));
				})(e)
					? e
					: ws(e)
					? Ne(Promise.resolve(e))
					: O(e);
			}
			const kB = {
					exact: function rM(e, t, n) {
						if (
							!jr(e.segments, t.segments) ||
							!xc(e.segments, t.segments, n) ||
							e.numberOfChildren !== t.numberOfChildren
						)
							return !1;
						for (const r in t.children)
							if (!e.children[r] || !rM(e.children[r], t.children[r], n)) return !1;
						return !0;
					},
					subset: oM,
				},
				tM = {
					exact: function LB(e, t) {
						return dn(e, t);
					},
					subset: function VB(e, t) {
						return (
							Object.keys(t).length <= Object.keys(e).length &&
							Object.keys(t).every((n) => KI(e[n], t[n]))
						);
					},
					ignored: () => !0,
				};
			function nM(e, t, n) {
				return (
					kB[n.paths](e.root, t.root, n.matrixParams) &&
					tM[n.queryParams](e.queryParams, t.queryParams) &&
					!("exact" === n.fragment && e.fragment !== t.fragment)
				);
			}
			function oM(e, t, n) {
				return iM(e, t, t.segments, n);
			}
			function iM(e, t, n, r) {
				if (e.segments.length > n.length) {
					const o = e.segments.slice(0, n.length);
					return !(!jr(o, n) || t.hasChildren() || !xc(o, n, r));
				}
				if (e.segments.length === n.length) {
					if (!jr(e.segments, n) || !xc(e.segments, n, r)) return !1;
					for (const o in t.children)
						if (!e.children[o] || !oM(e.children[o], t.children[o], r)) return !1;
					return !0;
				}
				{
					const o = n.slice(0, e.segments.length),
						i = n.slice(e.segments.length);
					return (
						!!(jr(e.segments, o) && xc(e.segments, o, r) && e.children[B]) &&
						iM(e.children[B], t, i, r)
					);
				}
			}
			function xc(e, t, n) {
				return t.every((r, o) => tM[n](e[o].parameters, r.parameters));
			}
			class ri {
				constructor(t = new se([], {}), n = {}, r = null) {
					(this.root = t), (this.queryParams = n), (this.fragment = r);
				}
				get queryParamMap() {
					return (this._queryParamMap ??= ni(this.queryParams)), this._queryParamMap;
				}
				toString() {
					return UB.serialize(this);
				}
			}
			class se {
				constructor(t, n) {
					(this.segments = t),
						(this.children = n),
						(this.parent = null),
						Object.values(n).forEach((r) => (r.parent = this));
				}
				hasChildren() {
					return this.numberOfChildren > 0;
				}
				get numberOfChildren() {
					return Object.keys(this.children).length;
				}
				toString() {
					return Oc(this);
				}
			}
			class Us {
				constructor(t, n) {
					(this.path = t), (this.parameters = n);
				}
				get parameterMap() {
					return (this._parameterMap ??= ni(this.parameters)), this._parameterMap;
				}
				toString() {
					return uM(this);
				}
			}
			function jr(e, t) {
				return e.length === t.length && e.every((n, r) => n.path === t[r].path);
			}
			let oi = (() => {
				class e {
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: () => new Sp(), providedIn: "root" }));
				}
				return e;
			})();
			class Sp {
				parse(t) {
					const n = new JB(t);
					return new ri(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment());
				}
				serialize(t) {
					const n = `/${$s(t.root, !0)}`,
						r = (function zB(e) {
							const t = Object.entries(e)
								.map(([n, r]) =>
									Array.isArray(r)
										? r.map((o) => `${Pc(n)}=${Pc(o)}`).join("&")
										: `${Pc(n)}=${Pc(r)}`,
								)
								.filter((n) => n);
							return t.length ? `?${t.join("&")}` : "";
						})(t.queryParams);
					return `${n}${r}${
						"string" == typeof t.fragment
							? `#${(function $B(e) {
									return encodeURI(e);
							  })(t.fragment)}`
							: ""
					}`;
				}
			}
			const UB = new Sp();
			function Oc(e) {
				return e.segments.map((t) => uM(t)).join("/");
			}
			function $s(e, t) {
				if (!e.hasChildren()) return Oc(e);
				if (t) {
					const n = e.children[B] ? $s(e.children[B], !1) : "",
						r = [];
					return (
						Object.entries(e.children).forEach(([o, i]) => {
							o !== B && r.push(`${o}:${$s(i, !1)}`);
						}),
						r.length > 0 ? `${n}(${r.join("//")})` : n
					);
				}
				{
					const n = (function BB(e, t) {
						let n = [];
						return (
							Object.entries(e.children).forEach(([r, o]) => {
								r === B && (n = n.concat(t(o, r)));
							}),
							Object.entries(e.children).forEach(([r, o]) => {
								r !== B && (n = n.concat(t(o, r)));
							}),
							n
						);
					})(e, (r, o) => (o === B ? [$s(e.children[B], !1)] : [`${o}:${$s(r, !1)}`]));
					return 1 === Object.keys(e.children).length && null != e.children[B]
						? `${Oc(e)}/${n[0]}`
						: `${Oc(e)}/(${n.join("//")})`;
				}
			}
			function sM(e) {
				return encodeURIComponent(e)
					.replace(/%40/g, "@")
					.replace(/%3A/gi, ":")
					.replace(/%24/g, "$")
					.replace(/%2C/gi, ",");
			}
			function Pc(e) {
				return sM(e).replace(/%3B/gi, ";");
			}
			function Tp(e) {
				return sM(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
			}
			function Fc(e) {
				return decodeURIComponent(e);
			}
			function aM(e) {
				return Fc(e.replace(/\+/g, "%20"));
			}
			function uM(e) {
				return `${Tp(e.path)}${(function HB(e) {
					return Object.entries(e)
						.map(([t, n]) => `;${Tp(t)}=${Tp(n)}`)
						.join("");
				})(e.parameters)}`;
			}
			const GB = /^[^\/()?;#]+/;
			function Ap(e) {
				const t = e.match(GB);
				return t ? t[0] : "";
			}
			const qB = /^[^\/()?;=#]+/,
				ZB = /^[^=?&#]+/,
				YB = /^[^&#]+/;
			class JB {
				constructor(t) {
					(this.url = t), (this.remaining = t);
				}
				parseRootSegment() {
					return (
						this.consumeOptional("/"),
						"" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#")
							? new se([], {})
							: new se([], this.parseChildren())
					);
				}
				parseQueryParams() {
					const t = {};
					if (this.consumeOptional("?"))
						do {
							this.parseQueryParam(t);
						} while (this.consumeOptional("&"));
					return t;
				}
				parseFragment() {
					return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
				}
				parseChildren() {
					if ("" === this.remaining) return {};
					this.consumeOptional("/");
					const t = [];
					for (
						this.peekStartsWith("(") || t.push(this.parseSegment());
						this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");

					)
						this.capture("/"), t.push(this.parseSegment());
					let n = {};
					this.peekStartsWith("/(") && (this.capture("/"), (n = this.parseParens(!0)));
					let r = {};
					return (
						this.peekStartsWith("(") && (r = this.parseParens(!1)),
						(t.length > 0 || Object.keys(n).length > 0) && (r[B] = new se(t, n)),
						r
					);
				}
				parseSegment() {
					const t = Ap(this.remaining);
					if ("" === t && this.peekStartsWith(";")) throw new _(4009, !1);
					return this.capture(t), new Us(Fc(t), this.parseMatrixParams());
				}
				parseMatrixParams() {
					const t = {};
					for (; this.consumeOptional(";"); ) this.parseParam(t);
					return t;
				}
				parseParam(t) {
					const n = (function WB(e) {
						const t = e.match(qB);
						return t ? t[0] : "";
					})(this.remaining);
					if (!n) return;
					this.capture(n);
					let r = "";
					if (this.consumeOptional("=")) {
						const o = Ap(this.remaining);
						o && ((r = o), this.capture(r));
					}
					t[Fc(n)] = Fc(r);
				}
				parseQueryParam(t) {
					const n = (function QB(e) {
						const t = e.match(ZB);
						return t ? t[0] : "";
					})(this.remaining);
					if (!n) return;
					this.capture(n);
					let r = "";
					if (this.consumeOptional("=")) {
						const s = (function XB(e) {
							const t = e.match(YB);
							return t ? t[0] : "";
						})(this.remaining);
						s && ((r = s), this.capture(r));
					}
					const o = aM(n),
						i = aM(r);
					if (t.hasOwnProperty(o)) {
						let s = t[o];
						Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
					} else t[o] = i;
				}
				parseParens(t) {
					const n = {};
					for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
						const r = Ap(this.remaining),
							o = this.remaining[r.length];
						if ("/" !== o && ")" !== o && ";" !== o) throw new _(4010, !1);
						let i;
						r.indexOf(":") > -1
							? ((i = r.slice(0, r.indexOf(":"))), this.capture(i), this.capture(":"))
							: t && (i = B);
						const s = this.parseChildren();
						(n[i] = 1 === Object.keys(s).length ? s[B] : new se([], s)), this.consumeOptional("//");
					}
					return n;
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t);
				}
				consumeOptional(t) {
					return (
						!!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0)
					);
				}
				capture(t) {
					if (!this.consumeOptional(t)) throw new _(4011, !1);
				}
			}
			function cM(e) {
				return e.segments.length > 0 ? new se([], { [B]: e }) : e;
			}
			function lM(e) {
				const t = {};
				for (const [r, o] of Object.entries(e.children)) {
					const i = lM(o);
					if (r === B && 0 === i.segments.length && i.hasChildren())
						for (const [s, a] of Object.entries(i.children)) t[s] = a;
					else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
				}
				return (function KB(e) {
					if (1 === e.numberOfChildren && e.children[B]) {
						const t = e.children[B];
						return new se(e.segments.concat(t.segments), t.children);
					}
					return e;
				})(new se(e.segments, t));
			}
			function ii(e) {
				return e instanceof ri;
			}
			function dM(e) {
				let t;
				const o = cM(
					(function n(i) {
						const s = {};
						for (const u of i.children) {
							const c = n(u);
							s[u.outlet] = c;
						}
						const a = new se(i.url, s);
						return i === e && (t = a), a;
					})(e.root),
				);
				return t ?? o;
			}
			function fM(e, t, n, r) {
				let o = e;
				for (; o.parent; ) o = o.parent;
				if (0 === t.length) return Np(o, o, o, n, r);
				const i = (function tU(e) {
					if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new pM(!0, 0, e);
					let t = 0,
						n = !1;
					const r = e.reduce((o, i, s) => {
						if ("object" == typeof i && null != i) {
							if (i.outlets) {
								const a = {};
								return (
									Object.entries(i.outlets).forEach(([u, c]) => {
										a[u] = "string" == typeof c ? c.split("/") : c;
									}),
									[...o, { outlets: a }]
								);
							}
							if (i.segmentPath) return [...o, i.segmentPath];
						}
						return "string" != typeof i
							? [...o, i]
							: 0 === s
							? (i.split("/").forEach((a, u) => {
									(0 == u && "." === a) ||
										(0 == u && "" === a ? (n = !0) : ".." === a ? t++ : "" != a && o.push(a));
							  }),
							  o)
							: [...o, i];
					}, []);
					return new pM(n, t, r);
				})(t);
				if (i.toRoot()) return Np(o, o, new se([], {}), n, r);
				const s = (function nU(e, t, n) {
						if (e.isAbsolute) return new Lc(t, !0, 0);
						if (!n) return new Lc(t, !1, NaN);
						if (null === n.parent) return new Lc(n, !0, 0);
						const r = kc(e.commands[0]) ? 0 : 1;
						return (function rU(e, t, n) {
							let r = e,
								o = t,
								i = n;
							for (; i > o; ) {
								if (((i -= o), (r = r.parent), !r)) throw new _(4005, !1);
								o = r.segments.length;
							}
							return new Lc(r, !1, o - i);
						})(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
					})(i, o, e),
					a = s.processChildren
						? zs(s.segmentGroup, s.index, i.commands)
						: gM(s.segmentGroup, s.index, i.commands);
				return Np(o, s.segmentGroup, a, n, r);
			}
			function kc(e) {
				return "object" == typeof e && null != e && !e.outlets && !e.segmentPath;
			}
			function Hs(e) {
				return "object" == typeof e && null != e && e.outlets;
			}
			function Np(e, t, n, r, o) {
				let s,
					i = {};
				r &&
					Object.entries(r).forEach(([u, c]) => {
						i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
					}),
					(s = e === t ? n : hM(e, t, n));
				const a = cM(lM(s));
				return new ri(a, i, o);
			}
			function hM(e, t, n) {
				const r = {};
				return (
					Object.entries(e.children).forEach(([o, i]) => {
						r[o] = i === t ? n : hM(i, t, n);
					}),
					new se(e.segments, r)
				);
			}
			class pM {
				constructor(t, n, r) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = n),
						(this.commands = r),
						t && r.length > 0 && kc(r[0]))
					)
						throw new _(4003, !1);
					const o = r.find(Hs);
					if (o && o !== eM(r)) throw new _(4004, !1);
				}
				toRoot() {
					return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0];
				}
			}
			class Lc {
				constructor(t, n, r) {
					(this.segmentGroup = t), (this.processChildren = n), (this.index = r);
				}
			}
			function gM(e, t, n) {
				if (((e ??= new se([], {})), 0 === e.segments.length && e.hasChildren()))
					return zs(e, t, n);
				const r = (function iU(e, t, n) {
						let r = 0,
							o = t;
						const i = { match: !1, pathIndex: 0, commandIndex: 0 };
						for (; o < e.segments.length; ) {
							if (r >= n.length) return i;
							const s = e.segments[o],
								a = n[r];
							if (Hs(a)) break;
							const u = `${a}`,
								c = r < n.length - 1 ? n[r + 1] : null;
							if (o > 0 && void 0 === u) break;
							if (u && c && "object" == typeof c && void 0 === c.outlets) {
								if (!vM(u, c, s)) return i;
								r += 2;
							} else {
								if (!vM(u, {}, s)) return i;
								r++;
							}
							o++;
						}
						return { match: !0, pathIndex: o, commandIndex: r };
					})(e, t, n),
					o = n.slice(r.commandIndex);
				if (r.match && r.pathIndex < e.segments.length) {
					const i = new se(e.segments.slice(0, r.pathIndex), {});
					return (i.children[B] = new se(e.segments.slice(r.pathIndex), e.children)), zs(i, 0, o);
				}
				return r.match && 0 === o.length
					? new se(e.segments, {})
					: r.match && !e.hasChildren()
					? Rp(e, t, n)
					: r.match
					? zs(e, 0, o)
					: Rp(e, t, n);
			}
			function zs(e, t, n) {
				if (0 === n.length) return new se(e.segments, {});
				{
					const r = (function oU(e) {
							return Hs(e[0]) ? e[0].outlets : { [B]: e };
						})(n),
						o = {};
					if (
						Object.keys(r).some((i) => i !== B) &&
						e.children[B] &&
						1 === e.numberOfChildren &&
						0 === e.children[B].segments.length
					) {
						const i = zs(e.children[B], t, n);
						return new se(e.segments, i.children);
					}
					return (
						Object.entries(r).forEach(([i, s]) => {
							"string" == typeof s && (s = [s]), null !== s && (o[i] = gM(e.children[i], t, s));
						}),
						Object.entries(e.children).forEach(([i, s]) => {
							void 0 === r[i] && (o[i] = s);
						}),
						new se(e.segments, o)
					);
				}
			}
			function Rp(e, t, n) {
				const r = e.segments.slice(0, t);
				let o = 0;
				for (; o < n.length; ) {
					const i = n[o];
					if (Hs(i)) {
						const u = sU(i.outlets);
						return new se(r, u);
					}
					if (0 === o && kc(n[0])) {
						r.push(new Us(e.segments[t].path, mM(n[0]))), o++;
						continue;
					}
					const s = Hs(i) ? i.outlets[B] : `${i}`,
						a = o < n.length - 1 ? n[o + 1] : null;
					s && a && kc(a) ? (r.push(new Us(s, mM(a))), (o += 2)) : (r.push(new Us(s, {})), o++);
				}
				return new se(r, {});
			}
			function sU(e) {
				const t = {};
				return (
					Object.entries(e).forEach(([n, r]) => {
						"string" == typeof r && (r = [r]), null !== r && (t[n] = Rp(new se([], {}), 0, r));
					}),
					t
				);
			}
			function mM(e) {
				const t = {};
				return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
			}
			function vM(e, t, n) {
				return e == n.path && dn(t, n.parameters);
			}
			const Gs = "imperative";
			var G = (function (e) {
				return (
					(e[(e.NavigationStart = 0)] = "NavigationStart"),
					(e[(e.NavigationEnd = 1)] = "NavigationEnd"),
					(e[(e.NavigationCancel = 2)] = "NavigationCancel"),
					(e[(e.NavigationError = 3)] = "NavigationError"),
					(e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
					(e[(e.ResolveStart = 5)] = "ResolveStart"),
					(e[(e.ResolveEnd = 6)] = "ResolveEnd"),
					(e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
					(e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
					(e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
					(e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
					(e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
					(e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
					(e[(e.ActivationStart = 13)] = "ActivationStart"),
					(e[(e.ActivationEnd = 14)] = "ActivationEnd"),
					(e[(e.Scroll = 15)] = "Scroll"),
					(e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
					e
				);
			})(G || {});
			class fn {
				constructor(t, n) {
					(this.id = t), (this.url = n);
				}
			}
			class Vc extends fn {
				constructor(t, n, r = "imperative", o = null) {
					super(t, n),
						(this.type = G.NavigationStart),
						(this.navigationTrigger = r),
						(this.restoredState = o);
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class Fn extends fn {
				constructor(t, n, r) {
					super(t, n), (this.urlAfterRedirects = r), (this.type = G.NavigationEnd);
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
				}
			}
			var xt = (function (e) {
					return (
						(e[(e.Redirect = 0)] = "Redirect"),
						(e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
						(e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
						(e[(e.GuardRejected = 3)] = "GuardRejected"),
						e
					);
				})(xt || {}),
				jc = (function (e) {
					return (
						(e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
						(e[(e.IgnoredByUrlHandlingStrategy = 1)] = "IgnoredByUrlHandlingStrategy"),
						e
					);
				})(jc || {});
			class si extends fn {
				constructor(t, n, r, o) {
					super(t, n), (this.reason = r), (this.code = o), (this.type = G.NavigationCancel);
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class ai extends fn {
				constructor(t, n, r, o) {
					super(t, n), (this.reason = r), (this.code = o), (this.type = G.NavigationSkipped);
				}
			}
			class Bc extends fn {
				constructor(t, n, r, o) {
					super(t, n), (this.error = r), (this.target = o), (this.type = G.NavigationError);
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
				}
			}
			class yM extends fn {
				constructor(t, n, r, o) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = o),
						(this.type = G.RoutesRecognized);
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class aU extends fn {
				constructor(t, n, r, o) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = o),
						(this.type = G.GuardsCheckStart);
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class uU extends fn {
				constructor(t, n, r, o, i) {
					super(t, n),
						(this.urlAfterRedirects = r),
						(this.state = o),
						(this.shouldActivate = i),
						(this.type = G.GuardsCheckEnd);
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
				}
			}
			class cU extends fn {
				constructor(t, n, r, o) {
					super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = G.ResolveStart);
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class lU extends fn {
				constructor(t, n, r, o) {
					super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.type = G.ResolveEnd);
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class dU {
				constructor(t) {
					(this.route = t), (this.type = G.RouteConfigLoadStart);
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`;
				}
			}
			class fU {
				constructor(t) {
					(this.route = t), (this.type = G.RouteConfigLoadEnd);
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`;
				}
			}
			class hU {
				constructor(t) {
					(this.snapshot = t), (this.type = G.ChildActivationStart);
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class pU {
				constructor(t) {
					(this.snapshot = t), (this.type = G.ChildActivationEnd);
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class gU {
				constructor(t) {
					(this.snapshot = t), (this.type = G.ActivationStart);
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class mU {
				constructor(t) {
					(this.snapshot = t), (this.type = G.ActivationEnd);
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
					}')`;
				}
			}
			class DM {
				constructor(t, n, r) {
					(this.routerEvent = t), (this.position = n), (this.anchor = r), (this.type = G.Scroll);
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position ? `${this.position[0]}, ${this.position[1]}` : null
					}')`;
				}
			}
			class xp {}
			class Op {
				constructor(t) {
					this.url = t;
				}
			}
			class vU {
				constructor() {
					(this.outlet = null),
						(this.route = null),
						(this.injector = null),
						(this.children = new qs()),
						(this.attachRef = null);
				}
			}
			let qs = (() => {
				class e {
					constructor() {
						this.contexts = new Map();
					}
					onChildOutletCreated(n, r) {
						const o = this.getOrCreateContext(n);
						(o.outlet = r), this.contexts.set(n, o);
					}
					onChildOutletDestroyed(n) {
						const r = this.getContext(n);
						r && ((r.outlet = null), (r.attachRef = null));
					}
					onOutletDeactivated() {
						const n = this.contexts;
						return (this.contexts = new Map()), n;
					}
					onOutletReAttached(n) {
						this.contexts = n;
					}
					getOrCreateContext(n) {
						let r = this.getContext(n);
						return r || ((r = new vU()), this.contexts.set(n, r)), r;
					}
					getContext(n) {
						return this.contexts.get(n) || null;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			class _M {
				constructor(t) {
					this._root = t;
				}
				get root() {
					return this._root.value;
				}
				parent(t) {
					const n = this.pathFromRoot(t);
					return n.length > 1 ? n[n.length - 2] : null;
				}
				children(t) {
					const n = Pp(t, this._root);
					return n ? n.children.map((r) => r.value) : [];
				}
				firstChild(t) {
					const n = Pp(t, this._root);
					return n && n.children.length > 0 ? n.children[0].value : null;
				}
				siblings(t) {
					const n = Fp(t, this._root);
					return n.length < 2
						? []
						: n[n.length - 2].children.map((o) => o.value).filter((o) => o !== t);
				}
				pathFromRoot(t) {
					return Fp(t, this._root).map((n) => n.value);
				}
			}
			function Pp(e, t) {
				if (e === t.value) return t;
				for (const n of t.children) {
					const r = Pp(e, n);
					if (r) return r;
				}
				return null;
			}
			function Fp(e, t) {
				if (e === t.value) return [t];
				for (const n of t.children) {
					const r = Fp(e, n);
					if (r.length) return r.unshift(t), r;
				}
				return [];
			}
			class Wt {
				constructor(t, n) {
					(this.value = t), (this.children = n);
				}
				toString() {
					return `TreeNode(${this.value})`;
				}
			}
			function ui(e) {
				const t = {};
				return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
			}
			class CM extends _M {
				constructor(t, n) {
					super(t), (this.snapshot = n), Vp(this, t);
				}
				toString() {
					return this.snapshot.toString();
				}
			}
			function wM(e) {
				const t = (function yU(e) {
						const i = new Lp([], {}, {}, "", {}, B, e, null, {});
						return new EM("", new Wt(i, []));
					})(e),
					n = new bt([new Us("", {})]),
					r = new bt({}),
					o = new bt({}),
					i = new bt({}),
					s = new bt(""),
					a = new ci(n, r, i, s, o, B, e, t.root);
				return (a.snapshot = t.root), new CM(new Wt(a, []), t);
			}
			class ci {
				constructor(t, n, r, o, i, s, a, u) {
					(this.urlSubject = t),
						(this.paramsSubject = n),
						(this.queryParamsSubject = r),
						(this.fragmentSubject = o),
						(this.dataSubject = i),
						(this.outlet = s),
						(this.component = a),
						(this._futureSnapshot = u),
						(this.title = this.dataSubject?.pipe(z((c) => c[Bs])) ?? O(void 0)),
						(this.url = t),
						(this.params = n),
						(this.queryParams = r),
						(this.fragment = o),
						(this.data = i);
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig;
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (this._paramMap ??= this.params.pipe(z((t) => ni(t)))), this._paramMap;
				}
				get queryParamMap() {
					return (
						(this._queryParamMap ??= this.queryParams.pipe(z((t) => ni(t)))), this._queryParamMap
					);
				}
				toString() {
					return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
				}
			}
			function kp(e, t, n = "emptyOnly") {
				let r;
				const { routeConfig: o } = e;
				return (
					(r =
						null === t ||
						("always" !== n && "" !== o?.path && (t.component || t.routeConfig?.loadComponent))
							? {
									params: { ...e.params },
									data: { ...e.data },
									resolve: { ...e.data, ...(e._resolvedData ?? {}) },
							  }
							: {
									params: { ...t.params, ...e.params },
									data: { ...t.data, ...e.data },
									resolve: { ...e.data, ...t.data, ...o?.data, ...e._resolvedData },
							  }),
					o && IM(o) && (r.resolve[Bs] = o.title),
					r
				);
			}
			class Lp {
				get title() {
					return this.data?.[Bs];
				}
				constructor(t, n, r, o, i, s, a, u, c) {
					(this.url = t),
						(this.params = n),
						(this.queryParams = r),
						(this.fragment = o),
						(this.data = i),
						(this.outlet = s),
						(this.component = a),
						(this.routeConfig = u),
						(this._resolve = c);
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return (this._paramMap ??= ni(this.params)), this._paramMap;
				}
				get queryParamMap() {
					return (this._queryParamMap ??= ni(this.queryParams)), this._queryParamMap;
				}
				toString() {
					return `Route(url:'${this.url.map((r) => r.toString()).join("/")}', path:'${
						this.routeConfig ? this.routeConfig.path : ""
					}')`;
				}
			}
			class EM extends _M {
				constructor(t, n) {
					super(n), (this.url = t), Vp(this, n);
				}
				toString() {
					return bM(this._root);
				}
			}
			function Vp(e, t) {
				(t.value._routerState = e), t.children.forEach((n) => Vp(e, n));
			}
			function bM(e) {
				const t = e.children.length > 0 ? ` { ${e.children.map(bM).join(", ")} } ` : "";
				return `${e.value}${t}`;
			}
			function jp(e) {
				if (e.snapshot) {
					const t = e.snapshot,
						n = e._futureSnapshot;
					(e.snapshot = n),
						dn(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams),
						t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
						dn(t.params, n.params) || e.paramsSubject.next(n.params),
						(function FB(e, t) {
							if (e.length !== t.length) return !1;
							for (let n = 0; n < e.length; ++n) if (!dn(e[n], t[n])) return !1;
							return !0;
						})(t.url, n.url) || e.urlSubject.next(n.url),
						dn(t.data, n.data) || e.dataSubject.next(n.data);
				} else (e.snapshot = e._futureSnapshot), e.dataSubject.next(e._futureSnapshot.data);
			}
			function Bp(e, t) {
				const n =
					dn(e.params, t.params) &&
					(function jB(e, t) {
						return jr(e, t) && e.every((n, r) => dn(n.parameters, t[r].parameters));
					})(e.url, t.url);
				return n && !(!e.parent != !t.parent) && (!e.parent || Bp(e.parent, t.parent));
			}
			function IM(e) {
				return "string" == typeof e.title || null === e.title;
			}
			let MM = (() => {
				class e {
					constructor() {
						(this.activated = null),
							(this._activatedRoute = null),
							(this.name = B),
							(this.activateEvents = new ge()),
							(this.deactivateEvents = new ge()),
							(this.attachEvents = new ge()),
							(this.detachEvents = new ge()),
							(this.parentContexts = w(qs)),
							(this.location = w(Ut)),
							(this.changeDetector = w(Co)),
							(this.environmentInjector = w(_t)),
							(this.inputBinder = w(Uc, { optional: !0 })),
							(this.supportsBindingToComponentInputs = !0);
					}
					get activatedComponentRef() {
						return this.activated;
					}
					ngOnChanges(n) {
						if (n.name) {
							const { firstChange: r, previousValue: o } = n.name;
							if (r) return;
							this.isTrackedInParentContexts(o) &&
								(this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
								this.initializeOutletWithName();
						}
					}
					ngOnDestroy() {
						this.isTrackedInParentContexts(this.name) &&
							this.parentContexts.onChildOutletDestroyed(this.name),
							this.inputBinder?.unsubscribeFromRouteData(this);
					}
					isTrackedInParentContexts(n) {
						return this.parentContexts.getContext(n)?.outlet === this;
					}
					ngOnInit() {
						this.initializeOutletWithName();
					}
					initializeOutletWithName() {
						if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
						const n = this.parentContexts.getContext(this.name);
						n?.route &&
							(n.attachRef
								? this.attach(n.attachRef, n.route)
								: this.activateWith(n.route, n.injector));
					}
					get isActivated() {
						return !!this.activated;
					}
					get component() {
						if (!this.activated) throw new _(4012, !1);
						return this.activated.instance;
					}
					get activatedRoute() {
						if (!this.activated) throw new _(4012, !1);
						return this._activatedRoute;
					}
					get activatedRouteData() {
						return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
					}
					detach() {
						if (!this.activated) throw new _(4012, !1);
						this.location.detach();
						const n = this.activated;
						return (
							(this.activated = null),
							(this._activatedRoute = null),
							this.detachEvents.emit(n.instance),
							n
						);
					}
					attach(n, r) {
						(this.activated = n),
							(this._activatedRoute = r),
							this.location.insert(n.hostView),
							this.inputBinder?.bindActivatedRouteToOutletComponent(this),
							this.attachEvents.emit(n.instance);
					}
					deactivate() {
						if (this.activated) {
							const n = this.component;
							this.activated.destroy(),
								(this.activated = null),
								(this._activatedRoute = null),
								this.deactivateEvents.emit(n);
						}
					}
					activateWith(n, r) {
						if (this.isActivated) throw new _(4013, !1);
						this._activatedRoute = n;
						const o = this.location,
							s = n.snapshot.component,
							a = this.parentContexts.getOrCreateContext(this.name).children,
							u = new DU(n, a, o.injector);
						(this.activated = o.createComponent(s, {
							index: o.length,
							injector: u,
							environmentInjector: r ?? this.environmentInjector,
						})),
							this.changeDetector.markForCheck(),
							this.inputBinder?.bindActivatedRouteToOutletComponent(this),
							this.activateEvents.emit(this.activated.instance);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵdir = P({
						type: e,
						selectors: [["router-outlet"]],
						inputs: { name: "name" },
						outputs: {
							activateEvents: "activate",
							deactivateEvents: "deactivate",
							attachEvents: "attach",
							detachEvents: "detach",
						},
						exportAs: ["outlet"],
						standalone: !0,
						features: [It],
					}));
				}
				return e;
			})();
			class DU {
				constructor(t, n, r) {
					(this.route = t), (this.childContexts = n), (this.parent = r);
				}
				get(t, n) {
					return t === ci ? this.route : t === qs ? this.childContexts : this.parent.get(t, n);
				}
			}
			const Uc = new b("");
			let SM = (() => {
				class e {
					constructor() {
						this.outletDataSubscriptions = new Map();
					}
					bindActivatedRouteToOutletComponent(n) {
						this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
					}
					unsubscribeFromRouteData(n) {
						this.outletDataSubscriptions.get(n)?.unsubscribe(),
							this.outletDataSubscriptions.delete(n);
					}
					subscribeToRouteData(n) {
						const { activatedRoute: r } = n,
							o = wp([r.queryParams, r.params, r.data])
								.pipe(
									qt(
										([i, s, a], u) => (
											(a = { ...i, ...s, ...a }), 0 === u ? O(a) : Promise.resolve(a)
										),
									),
								)
								.subscribe((i) => {
									if (
										!n.isActivated ||
										!n.activatedComponentRef ||
										n.activatedRoute !== r ||
										null === r.component
									)
										return void this.unsubscribeFromRouteData(n);
									const s = (function N1(e) {
										const t = U(e);
										if (!t) return null;
										const n = new is(t);
										return {
											get selector() {
												return n.selector;
											},
											get type() {
												return n.componentType;
											},
											get inputs() {
												return n.inputs;
											},
											get outputs() {
												return n.outputs;
											},
											get ngContentSelectors() {
												return n.ngContentSelectors;
											},
											get isStandalone() {
												return t.standalone;
											},
											get isSignal() {
												return t.signals;
											},
										};
									})(r.component);
									if (s)
										for (const { templateName: a } of s.inputs)
											n.activatedComponentRef.setInput(a, i[a]);
									else this.unsubscribeFromRouteData(n);
								});
						this.outletDataSubscriptions.set(n, o);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			function Ws(e, t, n) {
				if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
					const r = n.value;
					r._futureSnapshot = t.value;
					const o = (function CU(e, t, n) {
						return t.children.map((r) => {
							for (const o of n.children)
								if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Ws(e, r, o);
							return Ws(e, r);
						});
					})(e, t, n);
					return new Wt(r, o);
				}
				{
					if (e.shouldAttach(t.value)) {
						const i = e.retrieve(t.value);
						if (null !== i) {
							const s = i.route;
							return (
								(s.value._futureSnapshot = t.value),
								(s.children = t.children.map((a) => Ws(e, a))),
								s
							);
						}
					}
					const r = (function wU(e) {
							return new ci(
								new bt(e.url),
								new bt(e.params),
								new bt(e.queryParams),
								new bt(e.fragment),
								new bt(e.data),
								e.outlet,
								e.component,
								e,
							);
						})(t.value),
						o = t.children.map((i) => Ws(e, i));
					return new Wt(r, o);
				}
			}
			const TM = "ngNavigationCancelingError";
			function AM(e, t) {
				const { redirectTo: n, navigationBehaviorOptions: r } = ii(t)
						? { redirectTo: t, navigationBehaviorOptions: void 0 }
						: t,
					o = NM(!1, xt.Redirect);
				return (o.url = n), (o.navigationBehaviorOptions = r), o;
			}
			function NM(e, t) {
				const n = new Error(`NavigationCancelingError: ${e || ""}`);
				return (n[TM] = !0), (n.cancellationCode = t), n;
			}
			function RM(e) {
				return !!e && e[TM];
			}
			let xM = (() => {
				class e {
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵcmp = yn({
						type: e,
						selectors: [["ng-component"]],
						standalone: !0,
						features: [LC],
						decls: 1,
						vars: 0,
						template: function (r, o) {
							1 & r && Tt(0, "router-outlet");
						},
						dependencies: [MM],
						encapsulation: 2,
					}));
				}
				return e;
			})();
			function Up(e) {
				const t = e.children && e.children.map(Up),
					n = t ? { ...e, children: t } : { ...e };
				return (
					!n.component &&
						!n.loadComponent &&
						(t || n.loadChildren) &&
						n.outlet &&
						n.outlet !== B &&
						(n.component = xM),
					n
				);
			}
			function hn(e) {
				return e.outlet || B;
			}
			function Zs(e) {
				if (!e) return null;
				if (e.routeConfig?._injector) return e.routeConfig._injector;
				for (let t = e.parent; t; t = t.parent) {
					const n = t.routeConfig;
					if (n?._loadedInjector) return n._loadedInjector;
					if (n?._injector) return n._injector;
				}
				return null;
			}
			class NU {
				constructor(t, n, r, o, i) {
					(this.routeReuseStrategy = t),
						(this.futureState = n),
						(this.currState = r),
						(this.forwardEvent = o),
						(this.inputBindingEnabled = i);
				}
				activate(t) {
					const n = this.futureState._root,
						r = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(n, r, t),
						jp(this.futureState.root),
						this.activateChildRoutes(n, r, t);
				}
				deactivateChildRoutes(t, n, r) {
					const o = ui(n);
					t.children.forEach((i) => {
						const s = i.value.outlet;
						this.deactivateRoutes(i, o[s], r), delete o[s];
					}),
						Object.values(o).forEach((i) => {
							this.deactivateRouteAndItsChildren(i, r);
						});
				}
				deactivateRoutes(t, n, r) {
					const o = t.value,
						i = n ? n.value : null;
					if (o === i)
						if (o.component) {
							const s = r.getContext(o.outlet);
							s && this.deactivateChildRoutes(t, n, s.children);
						} else this.deactivateChildRoutes(t, n, r);
					else i && this.deactivateRouteAndItsChildren(n, r);
				}
				deactivateRouteAndItsChildren(t, n) {
					t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
						? this.detachAndStoreRouteSubtree(t, n)
						: this.deactivateRouteAndOutlet(t, n);
				}
				detachAndStoreRouteSubtree(t, n) {
					const r = n.getContext(t.value.outlet),
						o = r && t.value.component ? r.children : n,
						i = ui(t);
					for (const s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
					if (r && r.outlet) {
						const s = r.outlet.detach(),
							a = r.children.onOutletDeactivated();
						this.routeReuseStrategy.store(t.value.snapshot, {
							componentRef: s,
							route: t,
							contexts: a,
						});
					}
				}
				deactivateRouteAndOutlet(t, n) {
					const r = n.getContext(t.value.outlet),
						o = r && t.value.component ? r.children : n,
						i = ui(t);
					for (const s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
					r &&
						(r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
						(r.attachRef = null),
						(r.route = null));
				}
				activateChildRoutes(t, n, r) {
					const o = ui(n);
					t.children.forEach((i) => {
						this.activateRoutes(i, o[i.value.outlet], r),
							this.forwardEvent(new mU(i.value.snapshot));
					}),
						t.children.length && this.forwardEvent(new pU(t.value.snapshot));
				}
				activateRoutes(t, n, r) {
					const o = t.value,
						i = n ? n.value : null;
					if ((jp(o), o === i))
						if (o.component) {
							const s = r.getOrCreateContext(o.outlet);
							this.activateChildRoutes(t, n, s.children);
						} else this.activateChildRoutes(t, n, r);
					else if (o.component) {
						const s = r.getOrCreateContext(o.outlet);
						if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
							const a = this.routeReuseStrategy.retrieve(o.snapshot);
							this.routeReuseStrategy.store(o.snapshot, null),
								s.children.onOutletReAttached(a.contexts),
								(s.attachRef = a.componentRef),
								(s.route = a.route.value),
								s.outlet && s.outlet.attach(a.componentRef, a.route.value),
								jp(a.route.value),
								this.activateChildRoutes(t, null, s.children);
						} else {
							const a = Zs(o.snapshot);
							(s.attachRef = null),
								(s.route = o),
								(s.injector = a),
								s.outlet && s.outlet.activateWith(o, s.injector),
								this.activateChildRoutes(t, null, s.children);
						}
					} else this.activateChildRoutes(t, null, r);
				}
			}
			class OM {
				constructor(t) {
					(this.path = t), (this.route = this.path[this.path.length - 1]);
				}
			}
			class $c {
				constructor(t, n) {
					(this.component = t), (this.route = n);
				}
			}
			function RU(e, t, n) {
				const r = e._root;
				return Qs(r, t ? t._root : null, n, [r.value]);
			}
			function li(e, t) {
				const n = Symbol(),
					r = t.get(e, n);
				return r === n
					? "function" != typeof e ||
					  (function wS(e) {
							return null !== va(e);
					  })(e)
						? t.get(e)
						: e
					: r;
			}
			function Qs(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
				const i = ui(t);
				return (
					e.children.forEach((s) => {
						(function OU(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
							const i = e.value,
								s = t ? t.value : null,
								a = n ? n.getContext(e.value.outlet) : null;
							if (s && i.routeConfig === s.routeConfig) {
								const u = (function PU(e, t, n) {
									if ("function" == typeof n) return n(e, t);
									switch (n) {
										case "pathParamsChange":
											return !jr(e.url, t.url);
										case "pathParamsOrQueryParamsChange":
											return !jr(e.url, t.url) || !dn(e.queryParams, t.queryParams);
										case "always":
											return !0;
										case "paramsOrQueryParamsChange":
											return !Bp(e, t) || !dn(e.queryParams, t.queryParams);
										default:
											return !Bp(e, t);
									}
								})(s, i, i.routeConfig.runGuardsAndResolvers);
								u
									? o.canActivateChecks.push(new OM(r))
									: ((i.data = s.data), (i._resolvedData = s._resolvedData)),
									Qs(e, t, i.component ? (a ? a.children : null) : n, r, o),
									u &&
										a &&
										a.outlet &&
										a.outlet.isActivated &&
										o.canDeactivateChecks.push(new $c(a.outlet.component, s));
							} else
								s && Ys(t, a, o),
									o.canActivateChecks.push(new OM(r)),
									Qs(e, null, i.component ? (a ? a.children : null) : n, r, o);
						})(s, i[s.value.outlet], n, r.concat([s.value]), o),
							delete i[s.value.outlet];
					}),
					Object.entries(i).forEach(([s, a]) => Ys(a, n.getContext(s), o)),
					o
				);
			}
			function Ys(e, t, n) {
				const r = ui(e),
					o = e.value;
				Object.entries(r).forEach(([i, s]) => {
					Ys(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
				}),
					n.canDeactivateChecks.push(
						new $c(
							o.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null,
							o,
						),
					);
			}
			function Xs(e) {
				return "function" == typeof e;
			}
			function PM(e) {
				return e instanceof Ac || "EmptyError" === e?.name;
			}
			const Hc = Symbol("INITIAL_VALUE");
			function di() {
				return qt((e) =>
					wp(
						e.map((t) =>
							t.pipe(
								ei(1),
								(function MB(...e) {
									const t = hc(e);
									return Ue((n, r) => {
										(t ? Ep(e, n, t) : Ep(e, n)).subscribe(r);
									});
								})(Hc),
							),
						),
					).pipe(
						z((t) => {
							for (const n of t)
								if (!0 !== n) {
									if (n === Hc) return Hc;
									if (!1 === n || n instanceof ri) return n;
								}
							return !0;
						}),
						On((t) => t !== Hc),
						ei(1),
					),
				);
			}
			function FM(e) {
				return (function _0(...e) {
					return vg(e);
				})(
					et((t) => {
						if (ii(t)) throw AM(0, t);
					}),
					z((t) => !0 === t),
				);
			}
			class $p {
				constructor(t) {
					this.segmentGroup = t || null;
				}
			}
			class Hp extends Error {
				constructor(t) {
					super(), (this.urlTree = t);
				}
			}
			function fi(e) {
				return Nc(new $p(e));
			}
			class KU {
				constructor(t, n) {
					(this.urlSerializer = t), (this.urlTree = n);
				}
				lineralizeSegments(t, n) {
					let r = [],
						o = n.root;
					for (;;) {
						if (((r = r.concat(o.segments)), 0 === o.numberOfChildren)) return O(r);
						if (o.numberOfChildren > 1 || !o.children[B]) return Nc(new _(4e3, !1));
						o = o.children[B];
					}
				}
				applyRedirectCommands(t, n, r) {
					const o = this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
					if (n.startsWith("/")) throw new Hp(o);
					return o;
				}
				applyRedirectCreateUrlTree(t, n, r, o) {
					const i = this.createSegmentGroup(t, n.root, r, o);
					return new ri(
						i,
						this.createQueryParams(n.queryParams, this.urlTree.queryParams),
						n.fragment,
					);
				}
				createQueryParams(t, n) {
					const r = {};
					return (
						Object.entries(t).forEach(([o, i]) => {
							if ("string" == typeof i && i.startsWith(":")) {
								const a = i.substring(1);
								r[o] = n[a];
							} else r[o] = i;
						}),
						r
					);
				}
				createSegmentGroup(t, n, r, o) {
					const i = this.createSegments(t, n.segments, r, o);
					let s = {};
					return (
						Object.entries(n.children).forEach(([a, u]) => {
							s[a] = this.createSegmentGroup(t, u, r, o);
						}),
						new se(i, s)
					);
				}
				createSegments(t, n, r, o) {
					return n.map((i) =>
						i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r),
					);
				}
				findPosParam(t, n, r) {
					const o = r[n.path.substring(1)];
					if (!o) throw new _(4001, !1);
					return o;
				}
				findOrReturn(t, n) {
					let r = 0;
					for (const o of n) {
						if (o.path === t.path) return n.splice(r), o;
						r++;
					}
					return t;
				}
			}
			const zp = {
				matched: !1,
				consumedSegments: [],
				remainingSegments: [],
				parameters: {},
				positionalParamSegments: {},
			};
			function e$(e, t, n, r, o) {
				const i = Gp(e, t, n);
				return i.matched
					? ((r = (function bU(e, t) {
							return (
								e.providers &&
									!e._injector &&
									(e._injector = Sf(e.providers, t, `Route: ${e.path}`)),
								e._injector ?? t
							);
					  })(t, r)),
					  (function YU(e, t, n, r) {
							const o = t.canMatch;
							return o && 0 !== o.length
								? O(
										o.map((s) => {
											const a = li(s, e);
											return ar(
												(function BU(e) {
													return e && Xs(e.canMatch);
												})(a)
													? a.canMatch(t, n)
													: Hn(e, () => a(t, n)),
											);
										}),
								  ).pipe(di(), FM())
								: O(!0);
					  })(r, t, n).pipe(z((s) => (!0 === s ? i : { ...zp }))))
					: O(i);
			}
			function Gp(e, t, n) {
				if ("**" === t.path)
					return (function t$(e) {
						return {
							matched: !0,
							parameters: e.length > 0 ? eM(e).parameters : {},
							consumedSegments: e,
							remainingSegments: [],
							positionalParamSegments: {},
						};
					})(n);
				if ("" === t.path)
					return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
						? { ...zp }
						: {
								matched: !0,
								consumedSegments: [],
								remainingSegments: n,
								parameters: {},
								positionalParamSegments: {},
						  };
				const o = (t.matcher || PB)(n, e, t);
				if (!o) return { ...zp };
				const i = {};
				Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
					i[a] = u.path;
				});
				const s =
					o.consumed.length > 0 ? { ...i, ...o.consumed[o.consumed.length - 1].parameters } : i;
				return {
					matched: !0,
					consumedSegments: o.consumed,
					remainingSegments: n.slice(o.consumed.length),
					parameters: s,
					positionalParamSegments: o.posParams ?? {},
				};
			}
			function kM(e, t, n, r) {
				return n.length > 0 &&
					(function o$(e, t, n) {
						return n.some((r) => zc(e, t, r) && hn(r) !== B);
					})(e, n, r)
					? { segmentGroup: new se(t, r$(r, new se(n, e.children))), slicedSegments: [] }
					: 0 === n.length &&
					  (function i$(e, t, n) {
							return n.some((r) => zc(e, t, r));
					  })(e, n, r)
					? { segmentGroup: new se(e.segments, n$(e, n, r, e.children)), slicedSegments: n }
					: { segmentGroup: new se(e.segments, e.children), slicedSegments: n };
			}
			function n$(e, t, n, r) {
				const o = {};
				for (const i of n)
					if (zc(e, t, i) && !r[hn(i)]) {
						const s = new se([], {});
						o[hn(i)] = s;
					}
				return { ...r, ...o };
			}
			function r$(e, t) {
				const n = {};
				n[B] = t;
				for (const r of e)
					if ("" === r.path && hn(r) !== B) {
						const o = new se([], {});
						n[hn(r)] = o;
					}
				return n;
			}
			function zc(e, t, n) {
				return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path;
			}
			class u$ {}
			class d$ {
				constructor(t, n, r, o, i, s, a) {
					(this.injector = t),
						(this.configLoader = n),
						(this.rootComponentType = r),
						(this.config = o),
						(this.urlTree = i),
						(this.paramsInheritanceStrategy = s),
						(this.urlSerializer = a),
						(this.applyRedirects = new KU(this.urlSerializer, this.urlTree)),
						(this.absoluteRedirectCount = 0),
						(this.allowRedirects = !0);
				}
				noMatchError(t) {
					return new _(4002, `'${t.segmentGroup}'`);
				}
				recognize() {
					const t = kM(this.urlTree.root, [], [], this.config).segmentGroup;
					return this.match(t).pipe(
						z((n) => {
							const r = new Lp(
									[],
									Object.freeze({}),
									Object.freeze({ ...this.urlTree.queryParams }),
									this.urlTree.fragment,
									{},
									B,
									this.rootComponentType,
									null,
									{},
								),
								o = new Wt(r, n),
								i = new EM("", o),
								s = (function eU(e, t, n = null, r = null) {
									return fM(dM(e), t, n, r);
								})(r, [], this.urlTree.queryParams, this.urlTree.fragment);
							return (
								(s.queryParams = this.urlTree.queryParams),
								(i.url = this.urlSerializer.serialize(s)),
								this.inheritParamsAndData(i._root, null),
								{ state: i, tree: s }
							);
						}),
					);
				}
				match(t) {
					return this.processSegmentGroup(this.injector, this.config, t, B).pipe(
						ti((r) => {
							if (r instanceof Hp) return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
							throw r instanceof $p ? this.noMatchError(r) : r;
						}),
					);
				}
				inheritParamsAndData(t, n) {
					const r = t.value,
						o = kp(r, n, this.paramsInheritanceStrategy);
					(r.params = Object.freeze(o.params)),
						(r.data = Object.freeze(o.data)),
						t.children.forEach((i) => this.inheritParamsAndData(i, r));
				}
				processSegmentGroup(t, n, r, o) {
					return 0 === r.segments.length && r.hasChildren()
						? this.processChildren(t, n, r)
						: this.processSegment(t, n, r, r.segments, o, !0).pipe(
								z((i) => (i instanceof Wt ? [i] : [])),
						  );
				}
				processChildren(t, n, r) {
					const o = [];
					for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
					return Ne(o).pipe(
						Jo((i) => {
							const s = r.children[i],
								a = (function TU(e, t) {
									const n = e.filter((r) => hn(r) === t);
									return n.push(...e.filter((r) => hn(r) !== t)), n;
								})(n, i);
							return this.processSegmentGroup(t, a, s, i);
						}),
						(function AB(e, t) {
							return Ue(
								(function TB(e, t, n, r, o) {
									return (i, s) => {
										let a = n,
											u = t,
											c = 0;
										i.subscribe(
											Re(
												s,
												(l) => {
													const d = c++;
													(u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
												},
												o &&
													(() => {
														a && s.next(u), s.complete();
													}),
											),
										);
									};
								})(e, t, arguments.length >= 2, !0),
							);
						})((i, s) => (i.push(...s), i)),
						Rc(null),
						(function NB(e, t) {
							const n = arguments.length >= 2;
							return (r) =>
								r.pipe(e ? On((o, i) => e(o, i, r)) : dr, Ip(1), n ? Rc(t) : JI(() => new Ac()));
						})(),
						Ke((i) => {
							if (null === i) return fi(r);
							const s = LM(i);
							return (
								(function f$(e) {
									e.sort((t, n) =>
										t.value.outlet === B
											? -1
											: n.value.outlet === B
											? 1
											: t.value.outlet.localeCompare(n.value.outlet),
									);
								})(s),
								O(s)
							);
						}),
					);
				}
				processSegment(t, n, r, o, i, s) {
					return Ne(n).pipe(
						Jo((a) =>
							this.processSegmentAgainstRoute(a._injector ?? t, n, a, r, o, i, s).pipe(
								ti((u) => {
									if (u instanceof $p) return O(null);
									throw u;
								}),
							),
						),
						Vr((a) => !!a),
						ti((a) => {
							if (PM(a))
								return (function a$(e, t, n) {
									return 0 === t.length && !e.children[n];
								})(r, o, i)
									? O(new u$())
									: fi(r);
							throw a;
						}),
					);
				}
				processSegmentAgainstRoute(t, n, r, o, i, s, a) {
					return (function s$(e, t, n, r) {
						return !!(hn(e) === r || (r !== B && zc(t, n, e))) && Gp(t, e, n).matched;
					})(r, o, i, s)
						? void 0 === r.redirectTo
							? this.matchSegmentAgainstRoute(t, o, r, i, s)
							: this.allowRedirects && a
							? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
							: fi(o)
						: fi(o);
				}
				expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
					const {
						matched: a,
						consumedSegments: u,
						positionalParamSegments: c,
						remainingSegments: l,
					} = Gp(n, o, i);
					if (!a) return fi(n);
					o.redirectTo.startsWith("/") &&
						(this.absoluteRedirectCount++,
						this.absoluteRedirectCount > 31 && (this.allowRedirects = !1));
					const d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, c);
					return this.applyRedirects
						.lineralizeSegments(o, d)
						.pipe(Ke((f) => this.processSegment(t, r, n, f.concat(l), s, !1)));
				}
				matchSegmentAgainstRoute(t, n, r, o, i) {
					const s = e$(n, r, o, t);
					return (
						"**" === r.path && (n.children = {}),
						s.pipe(
							qt((a) =>
								a.matched
									? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
											qt(({ routes: u }) => {
												const c = r._loadedInjector ?? t,
													{ consumedSegments: l, remainingSegments: d, parameters: f } = a,
													h = new Lp(
														l,
														f,
														Object.freeze({ ...this.urlTree.queryParams }),
														this.urlTree.fragment,
														(function p$(e) {
															return e.data || {};
														})(r),
														hn(r),
														r.component ?? r._loadedComponent ?? null,
														r,
														(function g$(e) {
															return e.resolve || {};
														})(r),
													),
													{ segmentGroup: p, slicedSegments: g } = kM(n, l, d, u);
												if (0 === g.length && p.hasChildren())
													return this.processChildren(c, u, p).pipe(
														z((D) => (null === D ? null : new Wt(h, D))),
													);
												if (0 === u.length && 0 === g.length) return O(new Wt(h, []));
												const m = hn(r) === i;
												return this.processSegment(c, u, p, g, m ? B : i, !0).pipe(
													z((D) => new Wt(h, D instanceof Wt ? [D] : [])),
												);
											}),
									  )
									: fi(n),
							),
						)
					);
				}
				getChildConfig(t, n, r) {
					return n.children
						? O({ routes: n.children, injector: t })
						: n.loadChildren
						? void 0 !== n._loadedRoutes
							? O({ routes: n._loadedRoutes, injector: n._loadedInjector })
							: (function QU(e, t, n, r) {
									const o = t.canLoad;
									return void 0 === o || 0 === o.length
										? O(!0)
										: O(
												o.map((s) => {
													const a = li(s, e);
													return ar(
														(function kU(e) {
															return e && Xs(e.canLoad);
														})(a)
															? a.canLoad(t, n)
															: Hn(e, () => a(t, n)),
													);
												}),
										  ).pipe(di(), FM());
							  })(t, n, r).pipe(
									Ke((o) =>
										o
											? this.configLoader.loadChildren(t, n).pipe(
													et((i) => {
														(n._loadedRoutes = i.routes), (n._loadedInjector = i.injector);
													}),
											  )
											: (function JU(e) {
													return Nc(NM(!1, xt.GuardRejected));
											  })(),
									),
							  )
						: O({ routes: [], injector: t });
				}
			}
			function h$(e) {
				const t = e.value.routeConfig;
				return t && "" === t.path;
			}
			function LM(e) {
				const t = [],
					n = new Set();
				for (const r of e) {
					if (!h$(r)) {
						t.push(r);
						continue;
					}
					const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
					void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
				}
				for (const r of n) {
					const o = LM(r.children);
					t.push(new Wt(r.value, o));
				}
				return t.filter((r) => !n.has(r));
			}
			function VM(e) {
				const t = e.children.map((n) => VM(n)).flat();
				return [e, ...t];
			}
			function qp(e) {
				return qt((t) => {
					const n = e(t);
					return n ? Ne(n).pipe(z(() => t)) : O(t);
				});
			}
			let jM = (() => {
					class e {
						buildTitle(n) {
							let r,
								o = n.root;
							for (; void 0 !== o; )
								(r = this.getResolvedTitleForRoute(o) ?? r),
									(o = o.children.find((i) => i.outlet === B));
							return r;
						}
						getResolvedTitleForRoute(n) {
							return n.data[Bs];
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: () => w(C$), providedIn: "root" }));
					}
					return e;
				})(),
				C$ = (() => {
					class e extends jM {
						constructor(n) {
							super(), (this.title = n);
						}
						updateTitle(n) {
							const r = this.buildTitle(n);
							void 0 !== r && this.title.setTitle(r);
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(XV));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			const hi = new b("", { providedIn: "root", factory: () => ({}) }),
				pi = new b("");
			let Wp = (() => {
				class e {
					constructor() {
						(this.componentLoaders = new WeakMap()),
							(this.childrenLoaders = new WeakMap()),
							(this.compiler = w(Mw));
					}
					loadComponent(n) {
						if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
						if (n._loadedComponent) return O(n._loadedComponent);
						this.onLoadStartListener && this.onLoadStartListener(n);
						const r = ar(n.loadComponent()).pipe(
								z(BM),
								et((i) => {
									this.onLoadEndListener && this.onLoadEndListener(n), (n._loadedComponent = i);
								}),
								Fs(() => {
									this.componentLoaders.delete(n);
								}),
							),
							o = new XI(r, () => new Ot()).pipe(bp());
						return this.componentLoaders.set(n, o), o;
					}
					loadChildren(n, r) {
						if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
						if (r._loadedRoutes) return O({ routes: r._loadedRoutes, injector: r._loadedInjector });
						this.onLoadStartListener && this.onLoadStartListener(r);
						const i = (function w$(e, t, n, r) {
								return ar(e.loadChildren()).pipe(
									z(BM),
									Ke((o) =>
										o instanceof ID || Array.isArray(o) ? O(o) : Ne(t.compileModuleAsync(o)),
									),
									z((o) => {
										r && r(e);
										let i,
											s,
											a = !1;
										return (
											Array.isArray(o)
												? ((s = o), !0)
												: ((i = o.create(n).injector),
												  (s = i.get(pi, [], { optional: !0, self: !0 }).flat())),
											{ routes: s.map(Up), injector: i }
										);
									}),
								);
							})(r, this.compiler, n, this.onLoadEndListener).pipe(
								Fs(() => {
									this.childrenLoaders.delete(r);
								}),
							),
							s = new XI(i, () => new Ot()).pipe(bp());
						return this.childrenLoaders.set(r, s), s;
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			function BM(e) {
				return (function E$(e) {
					return e && "object" == typeof e && "default" in e;
				})(e)
					? e.default
					: e;
			}
			let Zp = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: () => w(b$), providedIn: "root" }));
					}
					return e;
				})(),
				b$ = (() => {
					class e {
						shouldProcessUrl(n) {
							return !0;
						}
						extract(n) {
							return n;
						}
						merge(n, r) {
							return n;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			const UM = new b(""),
				$M = new b("");
			function I$(e, t, n) {
				const r = e.get($M),
					o = e.get(wt);
				return e.get(Y).runOutsideAngular(() => {
					if (!o.startViewTransition || r.skipNextTransition)
						return (r.skipNextTransition = !1), Promise.resolve();
					let i;
					const s = new Promise((c) => {
							i = c;
						}),
						a = o.startViewTransition(
							() => (
								i(),
								(function M$(e) {
									return new Promise((t) => {
										zy(t, { injector: e });
									});
								})(e)
							),
						),
						{ onViewTransitionCreated: u } = r;
					return u && Hn(e, () => u({ transition: a, from: t, to: n })), s;
				});
			}
			let Gc = (() => {
				class e {
					get hasRequestedNavigation() {
						return 0 !== this.navigationId;
					}
					constructor() {
						(this.currentNavigation = null),
							(this.currentTransition = null),
							(this.lastSuccessfulNavigation = null),
							(this.events = new Ot()),
							(this.transitionAbortSubject = new Ot()),
							(this.configLoader = w(Wp)),
							(this.environmentInjector = w(_t)),
							(this.urlSerializer = w(oi)),
							(this.rootContexts = w(qs)),
							(this.location = w(Is)),
							(this.inputBindingEnabled = null !== w(Uc, { optional: !0 })),
							(this.titleStrategy = w(jM)),
							(this.options = w(hi, { optional: !0 }) || {}),
							(this.paramsInheritanceStrategy =
								this.options.paramsInheritanceStrategy || "emptyOnly"),
							(this.urlHandlingStrategy = w(Zp)),
							(this.createViewTransition = w(UM, { optional: !0 })),
							(this.navigationId = 0),
							(this.afterPreactivation = () => O(void 0)),
							(this.rootComponentType = null),
							(this.configLoader.onLoadEndListener = (o) => this.events.next(new fU(o))),
							(this.configLoader.onLoadStartListener = (o) => this.events.next(new dU(o)));
					}
					complete() {
						this.transitions?.complete();
					}
					handleNavigationRequest(n) {
						const r = ++this.navigationId;
						this.transitions?.next({ ...this.transitions.value, ...n, id: r });
					}
					setupNavigations(n, r, o) {
						return (
							(this.transitions = new bt({
								id: 0,
								currentUrlTree: r,
								currentRawUrl: r,
								extractedUrl: this.urlHandlingStrategy.extract(r),
								urlAfterRedirects: this.urlHandlingStrategy.extract(r),
								rawUrl: r,
								extras: {},
								resolve: null,
								reject: null,
								promise: Promise.resolve(!0),
								source: Gs,
								restoredState: null,
								currentSnapshot: o.snapshot,
								targetSnapshot: null,
								currentRouterState: o,
								targetRouterState: null,
								guards: { canActivateChecks: [], canDeactivateChecks: [] },
								guardsResult: null,
							})),
							this.transitions.pipe(
								On((i) => 0 !== i.id),
								z((i) => ({ ...i, extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl) })),
								qt((i) => {
									this.currentTransition = i;
									let s = !1,
										a = !1;
									return O(i).pipe(
										et((u) => {
											this.currentNavigation = {
												id: u.id,
												initialUrl: u.rawUrl,
												extractedUrl: u.extractedUrl,
												trigger: u.source,
												extras: u.extras,
												previousNavigation: this.lastSuccessfulNavigation
													? { ...this.lastSuccessfulNavigation, previousNavigation: null }
													: null,
											};
										}),
										qt((u) => {
											const c =
												!n.navigated ||
												this.isUpdatingInternalState() ||
												this.isUpdatedBrowserUrl();
											if (
												!c &&
												"reload" !== (u.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)
											) {
												const d = "";
												return (
													this.events.next(
														new ai(
															u.id,
															this.urlSerializer.serialize(u.rawUrl),
															d,
															jc.IgnoredSameUrlNavigation,
														),
													),
													u.resolve(null),
													Pn
												);
											}
											if (this.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
												return O(u).pipe(
													qt((d) => {
														const f = this.transitions?.getValue();
														return (
															this.events.next(
																new Vc(
																	d.id,
																	this.urlSerializer.serialize(d.extractedUrl),
																	d.source,
																	d.restoredState,
																),
															),
															f !== this.transitions?.getValue() ? Pn : Promise.resolve(d)
														);
													}),
													(function m$(e, t, n, r, o, i) {
														return Ke((s) =>
															(function c$(e, t, n, r, o, i, s = "emptyOnly") {
																return new d$(e, t, n, r, o, s, i).recognize();
															})(e, t, n, r, s.extractedUrl, o, i).pipe(
																z(({ state: a, tree: u }) => ({
																	...s,
																	targetSnapshot: a,
																	urlAfterRedirects: u,
																})),
															),
														);
													})(
														this.environmentInjector,
														this.configLoader,
														this.rootComponentType,
														n.config,
														this.urlSerializer,
														this.paramsInheritanceStrategy,
													),
													et((d) => {
														(i.targetSnapshot = d.targetSnapshot),
															(i.urlAfterRedirects = d.urlAfterRedirects),
															(this.currentNavigation = {
																...this.currentNavigation,
																finalUrl: d.urlAfterRedirects,
															});
														const f = new yM(
															d.id,
															this.urlSerializer.serialize(d.extractedUrl),
															this.urlSerializer.serialize(d.urlAfterRedirects),
															d.targetSnapshot,
														);
														this.events.next(f);
													}),
												);
											if (c && this.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)) {
												const {
														id: d,
														extractedUrl: f,
														source: h,
														restoredState: p,
														extras: g,
													} = u,
													m = new Vc(d, this.urlSerializer.serialize(f), h, p);
												this.events.next(m);
												const D = wM(this.rootComponentType).snapshot;
												return (
													(this.currentTransition = i =
														{
															...u,
															targetSnapshot: D,
															urlAfterRedirects: f,
															extras: { ...g, skipLocationChange: !1, replaceUrl: !1 },
														}),
													(this.currentNavigation.finalUrl = f),
													O(i)
												);
											}
											{
												const d = "";
												return (
													this.events.next(
														new ai(
															u.id,
															this.urlSerializer.serialize(u.extractedUrl),
															d,
															jc.IgnoredByUrlHandlingStrategy,
														),
													),
													u.resolve(null),
													Pn
												);
											}
										}),
										et((u) => {
											const c = new aU(
												u.id,
												this.urlSerializer.serialize(u.extractedUrl),
												this.urlSerializer.serialize(u.urlAfterRedirects),
												u.targetSnapshot,
											);
											this.events.next(c);
										}),
										z(
											(u) => (
												(this.currentTransition = i =
													{
														...u,
														guards: RU(u.targetSnapshot, u.currentSnapshot, this.rootContexts),
													}),
												i
											),
										),
										(function UU(e, t) {
											return Ke((n) => {
												const {
													targetSnapshot: r,
													currentSnapshot: o,
													guards: { canActivateChecks: i, canDeactivateChecks: s },
												} = n;
												return 0 === s.length && 0 === i.length
													? O({ ...n, guardsResult: !0 })
													: (function $U(e, t, n, r) {
															return Ne(e).pipe(
																Ke((o) =>
																	(function ZU(e, t, n, r, o) {
																		const i =
																			t && t.routeConfig ? t.routeConfig.canDeactivate : null;
																		return i && 0 !== i.length
																			? O(
																					i.map((a) => {
																						const u = Zs(t) ?? o,
																							c = li(a, u);
																						return ar(
																							(function jU(e) {
																								return e && Xs(e.canDeactivate);
																							})(c)
																								? c.canDeactivate(e, t, n, r)
																								: Hn(u, () => c(e, t, n, r)),
																						).pipe(Vr());
																					}),
																			  ).pipe(di())
																			: O(!0);
																	})(o.component, o.route, n, t, r),
																),
																Vr((o) => !0 !== o, !0),
															);
													  })(s, r, o, e).pipe(
															Ke((a) =>
																a &&
																(function FU(e) {
																	return "boolean" == typeof e;
																})(a)
																	? (function HU(e, t, n, r) {
																			return Ne(t).pipe(
																				Jo((o) =>
																					Ep(
																						(function GU(e, t) {
																							return null !== e && t && t(new hU(e)), O(!0);
																						})(o.route.parent, r),
																						(function zU(e, t) {
																							return null !== e && t && t(new gU(e)), O(!0);
																						})(o.route, r),
																						(function WU(e, t, n) {
																							const r = t[t.length - 1],
																								i = t
																									.slice(0, t.length - 1)
																									.reverse()
																									.map((s) =>
																										(function xU(e) {
																											const t = e.routeConfig
																												? e.routeConfig.canActivateChild
																												: null;
																											return t && 0 !== t.length
																												? { node: e, guards: t }
																												: null;
																										})(s),
																									)
																									.filter((s) => null !== s)
																									.map((s) =>
																										YI(() =>
																											O(
																												s.guards.map((u) => {
																													const c = Zs(s.node) ?? n,
																														l = li(u, c);
																													return ar(
																														(function VU(e) {
																															return e && Xs(e.canActivateChild);
																														})(l)
																															? l.canActivateChild(r, e)
																															: Hn(c, () => l(r, e)),
																													).pipe(Vr());
																												}),
																											).pipe(di()),
																										),
																									);
																							return O(i).pipe(di());
																						})(e, o.path, n),
																						(function qU(e, t, n) {
																							const r = t.routeConfig
																								? t.routeConfig.canActivate
																								: null;
																							if (!r || 0 === r.length) return O(!0);
																							const o = r.map((i) =>
																								YI(() => {
																									const s = Zs(t) ?? n,
																										a = li(i, s);
																									return ar(
																										(function LU(e) {
																											return e && Xs(e.canActivate);
																										})(a)
																											? a.canActivate(t, e)
																											: Hn(s, () => a(t, e)),
																									).pipe(Vr());
																								}),
																							);
																							return O(o).pipe(di());
																						})(e, o.route, n),
																					),
																				),
																				Vr((o) => !0 !== o, !0),
																			);
																	  })(r, i, e, t)
																	: O(a),
															),
															z((a) => ({ ...n, guardsResult: a })),
													  );
											});
										})(this.environmentInjector, (u) => this.events.next(u)),
										et((u) => {
											if (((i.guardsResult = u.guardsResult), ii(u.guardsResult)))
												throw AM(0, u.guardsResult);
											const c = new uU(
												u.id,
												this.urlSerializer.serialize(u.extractedUrl),
												this.urlSerializer.serialize(u.urlAfterRedirects),
												u.targetSnapshot,
												!!u.guardsResult,
											);
											this.events.next(c);
										}),
										On(
											(u) =>
												!!u.guardsResult ||
												(this.cancelNavigationTransition(u, "", xt.GuardRejected), !1),
										),
										qp((u) => {
											if (u.guards.canActivateChecks.length)
												return O(u).pipe(
													et((c) => {
														const l = new cU(
															c.id,
															this.urlSerializer.serialize(c.extractedUrl),
															this.urlSerializer.serialize(c.urlAfterRedirects),
															c.targetSnapshot,
														);
														this.events.next(l);
													}),
													qt((c) => {
														let l = !1;
														return O(c).pipe(
															(function v$(e, t) {
																return Ke((n) => {
																	const {
																		targetSnapshot: r,
																		guards: { canActivateChecks: o },
																	} = n;
																	if (!o.length) return O(n);
																	const i = new Set(o.map((u) => u.route)),
																		s = new Set();
																	for (const u of i) if (!s.has(u)) for (const c of VM(u)) s.add(c);
																	let a = 0;
																	return Ne(s).pipe(
																		Jo((u) =>
																			i.has(u)
																				? (function y$(e, t, n, r) {
																						const o = e.routeConfig,
																							i = e._resolve;
																						return (
																							void 0 !== o?.title && !IM(o) && (i[Bs] = o.title),
																							(function D$(e, t, n, r) {
																								const o = Mp(e);
																								if (0 === o.length) return O({});
																								const i = {};
																								return Ne(o).pipe(
																									Ke((s) =>
																										(function _$(e, t, n, r) {
																											const o = Zs(t) ?? r,
																												i = li(e, o);
																											return ar(
																												i.resolve
																													? i.resolve(t, n)
																													: Hn(o, () => i(t, n)),
																											);
																										})(e[s], t, n, r).pipe(
																											Vr(),
																											et((a) => {
																												i[s] = a;
																											}),
																										),
																									),
																									Ip(1),
																									(function RB(e) {
																										return z(() => e);
																									})(i),
																									ti((s) => (PM(s) ? Pn : Nc(s))),
																								);
																							})(i, e, t, r).pipe(
																								z(
																									(s) => (
																										(e._resolvedData = s),
																										(e.data = kp(e, e.parent, n).resolve),
																										null
																									),
																								),
																							)
																						);
																				  })(u, r, e, t)
																				: ((u.data = kp(u, u.parent, e).resolve), O(void 0)),
																		),
																		et(() => a++),
																		Ip(1),
																		Ke((u) => (a === s.size ? O(n) : Pn)),
																	);
																});
															})(this.paramsInheritanceStrategy, this.environmentInjector),
															et({
																next: () => (l = !0),
																complete: () => {
																	l ||
																		this.cancelNavigationTransition(c, "", xt.NoDataFromResolver);
																},
															}),
														);
													}),
													et((c) => {
														const l = new lU(
															c.id,
															this.urlSerializer.serialize(c.extractedUrl),
															this.urlSerializer.serialize(c.urlAfterRedirects),
															c.targetSnapshot,
														);
														this.events.next(l);
													}),
												);
										}),
										qp((u) => {
											const c = (l) => {
												const d = [];
												l.routeConfig?.loadComponent &&
													!l.routeConfig._loadedComponent &&
													d.push(
														this.configLoader.loadComponent(l.routeConfig).pipe(
															et((f) => {
																l.component = f;
															}),
															z(() => {}),
														),
													);
												for (const f of l.children) d.push(...c(f));
												return d;
											};
											return wp(c(u.targetSnapshot.root)).pipe(Rc(null), ei(1));
										}),
										qp(() => this.afterPreactivation()),
										qt(() => {
											const { currentSnapshot: u, targetSnapshot: c } = i,
												l = this.createViewTransition?.(this.environmentInjector, u.root, c.root);
											return l ? Ne(l).pipe(z(() => i)) : O(i);
										}),
										z((u) => {
											const c = (function _U(e, t, n) {
												const r = Ws(e, t._root, n ? n._root : void 0);
												return new CM(r, t);
											})(n.routeReuseStrategy, u.targetSnapshot, u.currentRouterState);
											return (
												(this.currentTransition = i = { ...u, targetRouterState: c }),
												(this.currentNavigation.targetRouterState = c),
												i
											);
										}),
										et(() => {
											this.events.next(new xp());
										}),
										((e, t, n, r) =>
											z(
												(o) => (
													new NU(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o
												),
											))(
											this.rootContexts,
											n.routeReuseStrategy,
											(u) => this.events.next(u),
											this.inputBindingEnabled,
										),
										ei(1),
										et({
											next: (u) => {
												(s = !0),
													(this.lastSuccessfulNavigation = this.currentNavigation),
													this.events.next(
														new Fn(
															u.id,
															this.urlSerializer.serialize(u.extractedUrl),
															this.urlSerializer.serialize(u.urlAfterRedirects),
														),
													),
													this.titleStrategy?.updateTitle(u.targetRouterState.snapshot),
													u.resolve(!0);
											},
											complete: () => {
												s = !0;
											},
										}),
										(function xB(e) {
											return Ue((t, n) => {
												cn(e).subscribe(Re(n, () => n.complete(), el)), !n.closed && t.subscribe(n);
											});
										})(
											this.transitionAbortSubject.pipe(
												et((u) => {
													throw u;
												}),
											),
										),
										Fs(() => {
											!s &&
												!a &&
												this.cancelNavigationTransition(i, "", xt.SupersededByNewNavigation),
												this.currentTransition?.id === i.id &&
													((this.currentNavigation = null), (this.currentTransition = null));
										}),
										ti((u) => {
											if (((a = !0), RM(u)))
												this.events.next(
													new si(
														i.id,
														this.urlSerializer.serialize(i.extractedUrl),
														u.message,
														u.cancellationCode,
													),
												),
													(function EU(e) {
														return RM(e) && ii(e.url);
													})(u)
														? this.events.next(new Op(u.url))
														: i.resolve(!1);
											else {
												this.events.next(
													new Bc(
														i.id,
														this.urlSerializer.serialize(i.extractedUrl),
														u,
														i.targetSnapshot ?? void 0,
													),
												);
												try {
													i.resolve(n.errorHandler(u));
												} catch (c) {
													this.options.resolveNavigationPromiseOnError
														? i.resolve(!1)
														: i.reject(c);
												}
											}
											return Pn;
										}),
									);
								}),
							)
						);
					}
					cancelNavigationTransition(n, r, o) {
						const i = new si(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
						this.events.next(i), n.resolve(!1);
					}
					isUpdatingInternalState() {
						return (
							this.currentTransition?.extractedUrl.toString() !==
							this.currentTransition?.currentUrlTree.toString()
						);
					}
					isUpdatedBrowserUrl() {
						return (
							this.urlHandlingStrategy
								.extract(this.urlSerializer.parse(this.location.path(!0)))
								.toString() !== this.currentTransition?.extractedUrl.toString() &&
							!this.currentTransition?.extras.skipLocationChange
						);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			function S$(e) {
				return e !== Gs;
			}
			let T$ = (() => {
				class e {
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: () => w(N$), providedIn: "root" }));
				}
				return e;
			})();
			class A$ {
				shouldDetach(t) {
					return !1;
				}
				store(t, n) {}
				shouldAttach(t) {
					return !1;
				}
				retrieve(t) {
					return null;
				}
				shouldReuseRoute(t, n) {
					return t.routeConfig === n.routeConfig;
				}
			}
			let N$ = (() => {
					class e extends A$ {
						static #e = (this.ɵfac = (() => {
							let n;
							return function (o) {
								return (n || (n = Ve(e)))(o || e);
							};
						})());
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})(),
				HM = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: () => w(R$), providedIn: "root" }));
					}
					return e;
				})(),
				R$ = (() => {
					class e extends HM {
						constructor() {
							super(...arguments),
								(this.location = w(Is)),
								(this.urlSerializer = w(oi)),
								(this.options = w(hi, { optional: !0 }) || {}),
								(this.canceledNavigationResolution =
									this.options.canceledNavigationResolution || "replace"),
								(this.urlHandlingStrategy = w(Zp)),
								(this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred"),
								(this.currentUrlTree = new ri()),
								(this.rawUrlTree = this.currentUrlTree),
								(this.currentPageId = 0),
								(this.lastSuccessfulId = -1),
								(this.routerState = wM(null)),
								(this.stateMemento = this.createStateMemento());
						}
						getCurrentUrlTree() {
							return this.currentUrlTree;
						}
						getRawUrlTree() {
							return this.rawUrlTree;
						}
						restoredState() {
							return this.location.getState();
						}
						get browserPageId() {
							return "computed" !== this.canceledNavigationResolution
								? this.currentPageId
								: this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
						}
						getRouterState() {
							return this.routerState;
						}
						createStateMemento() {
							return {
								rawUrlTree: this.rawUrlTree,
								currentUrlTree: this.currentUrlTree,
								routerState: this.routerState,
							};
						}
						registerNonRouterCurrentEntryChangeListener(n) {
							return this.location.subscribe((r) => {
								"popstate" === r.type && n(r.url, r.state);
							});
						}
						handleRouterEvent(n, r) {
							if (n instanceof Vc) this.stateMemento = this.createStateMemento();
							else if (n instanceof ai) this.rawUrlTree = r.initialUrl;
							else if (n instanceof yM) {
								if ("eager" === this.urlUpdateStrategy && !r.extras.skipLocationChange) {
									const o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
									this.setBrowserUrl(o, r);
								}
							} else
								n instanceof xp
									? ((this.currentUrlTree = r.finalUrl),
									  (this.rawUrlTree = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl)),
									  (this.routerState = r.targetRouterState),
									  "deferred" === this.urlUpdateStrategy &&
											(r.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, r)))
									: n instanceof si &&
									  (n.code === xt.GuardRejected || n.code === xt.NoDataFromResolver)
									? this.restoreHistory(r)
									: n instanceof Bc
									? this.restoreHistory(r, !0)
									: n instanceof Fn &&
									  ((this.lastSuccessfulId = n.id), (this.currentPageId = this.browserPageId));
						}
						setBrowserUrl(n, r) {
							const o = this.urlSerializer.serialize(n);
							if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
								const s = {
									...r.extras.state,
									...this.generateNgRouterState(r.id, this.browserPageId),
								};
								this.location.replaceState(o, "", s);
							} else {
								const i = {
									...r.extras.state,
									...this.generateNgRouterState(r.id, this.browserPageId + 1),
								};
								this.location.go(o, "", i);
							}
						}
						restoreHistory(n, r = !1) {
							if ("computed" === this.canceledNavigationResolution) {
								const i = this.currentPageId - this.browserPageId;
								0 !== i
									? this.location.historyGo(i)
									: this.currentUrlTree === n.finalUrl &&
									  0 === i &&
									  (this.resetState(n), this.resetUrlToCurrentUrlTree());
							} else
								"replace" === this.canceledNavigationResolution &&
									(r && this.resetState(n), this.resetUrlToCurrentUrlTree());
						}
						resetState(n) {
							(this.routerState = this.stateMemento.routerState),
								(this.currentUrlTree = this.stateMemento.currentUrlTree),
								(this.rawUrlTree = this.urlHandlingStrategy.merge(
									this.currentUrlTree,
									n.finalUrl ?? this.rawUrlTree,
								));
						}
						resetUrlToCurrentUrlTree() {
							this.location.replaceState(
								this.urlSerializer.serialize(this.rawUrlTree),
								"",
								this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId),
							);
						}
						generateNgRouterState(n, r) {
							return "computed" === this.canceledNavigationResolution
								? { navigationId: n, ɵrouterPageId: r }
								: { navigationId: n };
						}
						static #e = (this.ɵfac = (() => {
							let n;
							return function (o) {
								return (n || (n = Ve(e)))(o || e);
							};
						})());
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			var Js = (function (e) {
				return (
					(e[(e.COMPLETE = 0)] = "COMPLETE"),
					(e[(e.FAILED = 1)] = "FAILED"),
					(e[(e.REDIRECTING = 2)] = "REDIRECTING"),
					e
				);
			})(Js || {});
			function zM(e, t) {
				e.events
					.pipe(
						On((n) => n instanceof Fn || n instanceof si || n instanceof Bc || n instanceof ai),
						z((n) =>
							n instanceof Fn || n instanceof ai
								? Js.COMPLETE
								: n instanceof si &&
								  (n.code === xt.Redirect || n.code === xt.SupersededByNewNavigation)
								? Js.REDIRECTING
								: Js.FAILED,
						),
						On((n) => n !== Js.REDIRECTING),
						ei(1),
					)
					.subscribe(() => {
						t();
					});
			}
			function x$(e) {
				throw e;
			}
			const O$ = {
					paths: "exact",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "exact",
				},
				P$ = {
					paths: "subset",
					fragment: "ignored",
					matrixParams: "ignored",
					queryParams: "subset",
				};
			let Zt = (() => {
				class e {
					get currentUrlTree() {
						return this.stateManager.getCurrentUrlTree();
					}
					get rawUrlTree() {
						return this.stateManager.getRawUrlTree();
					}
					get events() {
						return this._events;
					}
					get routerState() {
						return this.stateManager.getRouterState();
					}
					constructor() {
						(this.disposed = !1),
							(this.isNgZoneEnabled = !1),
							(this.console = w(gw)),
							(this.stateManager = w(HM)),
							(this.options = w(hi, { optional: !0 }) || {}),
							(this.pendingTasks = w(br)),
							(this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred"),
							(this.navigationTransitions = w(Gc)),
							(this.urlSerializer = w(oi)),
							(this.location = w(Is)),
							(this.urlHandlingStrategy = w(Zp)),
							(this._events = new Ot()),
							(this.errorHandler = this.options.errorHandler || x$),
							(this.navigated = !1),
							(this.routeReuseStrategy = w(T$)),
							(this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore"),
							(this.config = w(pi, { optional: !0 })?.flat() ?? []),
							(this.componentInputBindingEnabled = !!w(Uc, { optional: !0 })),
							(this.eventsSubscription = new at()),
							(this.isNgZoneEnabled = w(Y) instanceof Y && Y.isInAngularZone()),
							this.resetConfig(this.config),
							this.navigationTransitions
								.setupNavigations(this, this.currentUrlTree, this.routerState)
								.subscribe({
									error: (n) => {
										this.console.warn(n);
									},
								}),
							this.subscribeToNavigationEvents();
					}
					subscribeToNavigationEvents() {
						const n = this.navigationTransitions.events.subscribe((r) => {
							try {
								const o = this.navigationTransitions.currentTransition,
									i = this.navigationTransitions.currentNavigation;
								if (null !== o && null !== i)
									if (
										(this.stateManager.handleRouterEvent(r, i),
										r instanceof si &&
											r.code !== xt.Redirect &&
											r.code !== xt.SupersededByNewNavigation)
									)
										this.navigated = !0;
									else if (r instanceof Fn) this.navigated = !0;
									else if (r instanceof Op) {
										const s = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
											a = {
												info: o.extras.info,
												skipLocationChange: o.extras.skipLocationChange,
												replaceUrl: "eager" === this.urlUpdateStrategy || S$(o.source),
											};
										this.scheduleNavigation(s, Gs, null, a, {
											resolve: o.resolve,
											reject: o.reject,
											promise: o.promise,
										});
									}
								(function k$(e) {
									return !(e instanceof xp || e instanceof Op);
								})(r) && this._events.next(r);
							} catch (o) {
								this.navigationTransitions.transitionAbortSubject.next(o);
							}
						});
						this.eventsSubscription.add(n);
					}
					resetRootComponentType(n) {
						(this.routerState.root.component = n),
							(this.navigationTransitions.rootComponentType = n);
					}
					initialNavigation() {
						this.setUpLocationChangeListener(),
							this.navigationTransitions.hasRequestedNavigation ||
								this.navigateToSyncWithBrowser(
									this.location.path(!0),
									Gs,
									this.stateManager.restoredState(),
								);
					}
					setUpLocationChangeListener() {
						this.nonRouterCurrentEntryChangeSubscription ??=
							this.stateManager.registerNonRouterCurrentEntryChangeListener((n, r) => {
								setTimeout(() => {
									this.navigateToSyncWithBrowser(n, "popstate", r);
								}, 0);
							});
					}
					navigateToSyncWithBrowser(n, r, o) {
						const i = { replaceUrl: !0 },
							s = o?.navigationId ? o : null;
						if (o) {
							const u = { ...o };
							delete u.navigationId,
								delete u.ɵrouterPageId,
								0 !== Object.keys(u).length && (i.state = u);
						}
						const a = this.parseUrl(n);
						this.scheduleNavigation(a, r, s, i);
					}
					get url() {
						return this.serializeUrl(this.currentUrlTree);
					}
					getCurrentNavigation() {
						return this.navigationTransitions.currentNavigation;
					}
					get lastSuccessfulNavigation() {
						return this.navigationTransitions.lastSuccessfulNavigation;
					}
					resetConfig(n) {
						(this.config = n.map(Up)), (this.navigated = !1);
					}
					ngOnDestroy() {
						this.dispose();
					}
					dispose() {
						this.navigationTransitions.complete(),
							this.nonRouterCurrentEntryChangeSubscription &&
								(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
								(this.nonRouterCurrentEntryChangeSubscription = void 0)),
							(this.disposed = !0),
							this.eventsSubscription.unsubscribe();
					}
					createUrlTree(n, r = {}) {
						const {
								relativeTo: o,
								queryParams: i,
								fragment: s,
								queryParamsHandling: a,
								preserveFragment: u,
							} = r,
							c = u ? this.currentUrlTree.fragment : s;
						let d,
							l = null;
						switch (a) {
							case "merge":
								l = { ...this.currentUrlTree.queryParams, ...i };
								break;
							case "preserve":
								l = this.currentUrlTree.queryParams;
								break;
							default:
								l = i || null;
						}
						null !== l && (l = this.removeEmptyProps(l));
						try {
							d = dM(o ? o.snapshot : this.routerState.snapshot.root);
						} catch {
							("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
								(d = this.currentUrlTree.root);
						}
						return fM(d, n, l, c ?? null);
					}
					navigateByUrl(n, r = { skipLocationChange: !1 }) {
						const o = ii(n) ? n : this.parseUrl(n),
							i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
						return this.scheduleNavigation(i, Gs, null, r);
					}
					navigate(n, r = { skipLocationChange: !1 }) {
						return (
							(function F$(e) {
								for (let t = 0; t < e.length; t++) if (null == e[t]) throw new _(4008, !1);
							})(n),
							this.navigateByUrl(this.createUrlTree(n, r), r)
						);
					}
					serializeUrl(n) {
						return this.urlSerializer.serialize(n);
					}
					parseUrl(n) {
						try {
							return this.urlSerializer.parse(n);
						} catch {
							return this.urlSerializer.parse("/");
						}
					}
					isActive(n, r) {
						let o;
						if (((o = !0 === r ? { ...O$ } : !1 === r ? { ...P$ } : r), ii(n)))
							return nM(this.currentUrlTree, n, o);
						const i = this.parseUrl(n);
						return nM(this.currentUrlTree, i, o);
					}
					removeEmptyProps(n) {
						return Object.entries(n).reduce((r, [o, i]) => (null != i && (r[o] = i), r), {});
					}
					scheduleNavigation(n, r, o, i, s) {
						if (this.disposed) return Promise.resolve(!1);
						let a, u, c;
						s
							? ((a = s.resolve), (u = s.reject), (c = s.promise))
							: (c = new Promise((d, f) => {
									(a = d), (u = f);
							  }));
						const l = this.pendingTasks.add();
						return (
							zM(this, () => {
								queueMicrotask(() => this.pendingTasks.remove(l));
							}),
							this.navigationTransitions.handleNavigationRequest({
								source: r,
								restoredState: o,
								currentUrlTree: this.currentUrlTree,
								currentRawUrl: this.currentUrlTree,
								rawUrl: n,
								extras: i,
								resolve: a,
								reject: u,
								promise: c,
								currentSnapshot: this.routerState.snapshot,
								currentRouterState: this.routerState,
							}),
							c.catch((d) => Promise.reject(d))
						);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			class GM {}
			let j$ = (() => {
				class e {
					constructor(n, r, o, i, s) {
						(this.router = n),
							(this.injector = o),
							(this.preloadingStrategy = i),
							(this.loader = s);
					}
					setUpPreloading() {
						this.subscription = this.router.events
							.pipe(
								On((n) => n instanceof Fn),
								Jo(() => this.preload()),
							)
							.subscribe(() => {});
					}
					preload() {
						return this.processRoutes(this.injector, this.router.config);
					}
					ngOnDestroy() {
						this.subscription && this.subscription.unsubscribe();
					}
					processRoutes(n, r) {
						const o = [];
						for (const i of r) {
							i.providers && !i._injector && (i._injector = Sf(i.providers, n, `Route: ${i.path}`));
							const s = i._injector ?? n,
								a = i._loadedInjector ?? s;
							((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
								(i.loadComponent && !i._loadedComponent)) &&
								o.push(this.preloadConfig(s, i)),
								(i.children || i._loadedRoutes) &&
									o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
						}
						return Ne(o).pipe(js());
					}
					preloadConfig(n, r) {
						return this.preloadingStrategy.preload(r, () => {
							let o;
							o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : O(null);
							const i = o.pipe(
								Ke((s) =>
									null === s
										? O(void 0)
										: ((r._loadedRoutes = s.routes),
										  (r._loadedInjector = s.injector),
										  this.processRoutes(s.injector ?? n, s.routes)),
								),
							);
							return r.loadComponent && !r._loadedComponent
								? Ne([i, this.loader.loadComponent(r)]).pipe(js())
								: i;
						});
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(Zt), S(Mw), S(_t), S(GM), S(Wp));
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
				}
				return e;
			})();
			const Yp = new b("");
			let qM = (() => {
				class e {
					constructor(n, r, o, i, s = {}) {
						(this.urlSerializer = n),
							(this.transitions = r),
							(this.viewportScroller = o),
							(this.zone = i),
							(this.options = s),
							(this.lastId = 0),
							(this.lastSource = "imperative"),
							(this.restoredId = 0),
							(this.store = {}),
							(s.scrollPositionRestoration ||= "disabled"),
							(s.anchorScrolling ||= "disabled");
					}
					init() {
						"disabled" !== this.options.scrollPositionRestoration &&
							this.viewportScroller.setHistoryScrollRestoration("manual"),
							(this.routerEventsSubscription = this.createScrollEvents()),
							(this.scrollEventsSubscription = this.consumeScrollEvents());
					}
					createScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof Vc
								? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
								  (this.lastSource = n.navigationTrigger),
								  (this.restoredId = n.restoredState ? n.restoredState.navigationId : 0))
								: n instanceof Fn
								? ((this.lastId = n.id),
								  this.scheduleScrollEvent(
										n,
										this.urlSerializer.parse(n.urlAfterRedirects).fragment,
								  ))
								: n instanceof ai &&
								  n.code === jc.IgnoredSameUrlNavigation &&
								  ((this.lastSource = void 0),
								  (this.restoredId = 0),
								  this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment));
						});
					}
					consumeScrollEvents() {
						return this.transitions.events.subscribe((n) => {
							n instanceof DM &&
								(n.position
									? "top" === this.options.scrollPositionRestoration
										? this.viewportScroller.scrollToPosition([0, 0])
										: "enabled" === this.options.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition(n.position)
									: n.anchor && "enabled" === this.options.anchorScrolling
									? this.viewportScroller.scrollToAnchor(n.anchor)
									: "disabled" !== this.options.scrollPositionRestoration &&
									  this.viewportScroller.scrollToPosition([0, 0]));
						});
					}
					scheduleScrollEvent(n, r) {
						this.zone.runOutsideAngular(() => {
							setTimeout(() => {
								this.zone.run(() => {
									this.transitions.events.next(
										new DM(
											n,
											"popstate" === this.lastSource ? this.store[this.restoredId] : null,
											r,
										),
									);
								});
							}, 0);
						});
					}
					ngOnDestroy() {
						this.routerEventsSubscription?.unsubscribe(),
							this.scrollEventsSubscription?.unsubscribe();
					}
					static #e = (this.ɵfac = function (r) {
						!(function Zv() {
							throw new Error("invalid");
						})();
					});
					static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
				}
				return e;
			})();
			function pn(e, t) {
				return { ɵkind: e, ɵproviders: t };
			}
			function ZM() {
				const e = w(lt);
				return (t) => {
					const n = e.get(Rr);
					if (t !== n.components[0]) return;
					const r = e.get(Zt),
						o = e.get(QM);
					1 === e.get(Xp) && r.initialNavigation(),
						e.get(YM, null, $.Optional)?.setUpPreloading(),
						e.get(Yp, null, $.Optional)?.init(),
						r.resetRootComponentType(n.componentTypes[0]),
						o.closed || (o.next(), o.complete(), o.unsubscribe());
				};
			}
			const QM = new b("", { factory: () => new Ot() }),
				Xp = new b("", { providedIn: "root", factory: () => 1 }),
				YM = new b("");
			function H$(e) {
				return pn(0, [
					{ provide: YM, useExisting: j$ },
					{ provide: GM, useExisting: e },
				]);
			}
			function G$(e) {
				return pn(9, [
					{ provide: UM, useValue: I$ },
					{ provide: $M, useValue: { skipNextTransition: !!e?.skipInitialTransition, ...e } },
				]);
			}
			const XM = new b("ROUTER_FORROOT_GUARD"),
				q$ = [
					Is,
					{ provide: oi, useClass: Sp },
					Zt,
					qs,
					{
						provide: ci,
						useFactory: function WM(e) {
							return e.routerState.root;
						},
						deps: [Zt],
					},
					Wp,
					[],
				];
			let JM = (() => {
				class e {
					constructor(n) {}
					static forRoot(n, r) {
						return {
							ngModule: e,
							providers: [
								q$,
								[],
								{ provide: pi, multi: !0, useValue: n },
								{ provide: XM, useFactory: Y$, deps: [[Zt, new Aa(), new Na()]] },
								{ provide: hi, useValue: r || {} },
								r?.useHash ? { provide: Or, useClass: F1 } : { provide: Or, useClass: uE },
								{
									provide: Yp,
									useFactory: () => {
										const e = w(XL),
											t = w(Y),
											n = w(hi),
											r = w(Gc),
											o = w(oi);
										return n.scrollOffset && e.setOffset(n.scrollOffset), new qM(o, r, e, t, n);
									},
								},
								r?.preloadingStrategy ? H$(r.preloadingStrategy).ɵproviders : [],
								r?.initialNavigation ? X$(r) : [],
								r?.bindToComponentInputs
									? pn(8, [SM, { provide: Uc, useExisting: SM }]).ɵproviders
									: [],
								r?.enableViewTransitions ? G$().ɵproviders : [],
								[
									{ provide: KM, useFactory: ZM },
									{ provide: dh, multi: !0, useExisting: KM },
								],
							],
						};
					}
					static forChild(n) {
						return { ngModule: e, providers: [{ provide: pi, multi: !0, useValue: n }] };
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(S(XM, 8));
					});
					static #t = (this.ɵmod = Yt({ type: e }));
					static #n = (this.ɵinj = Bt({}));
				}
				return e;
			})();
			function Y$(e) {
				return "guarded";
			}
			function X$(e) {
				return [
					"disabled" === e.initialNavigation
						? pn(3, [
								{
									provide: ch,
									multi: !0,
									useFactory: () => {
										const t = w(Zt);
										return () => {
											t.setUpLocationChangeListener();
										};
									},
								},
								{ provide: Xp, useValue: 2 },
						  ]).ɵproviders
						: [],
					"enabledBlocking" === e.initialNavigation
						? pn(2, [
								{ provide: Xp, useValue: 0 },
								{
									provide: ch,
									multi: !0,
									deps: [lt],
									useFactory: (t) => {
										const n = t.get(O1, Promise.resolve());
										return () =>
											n.then(
												() =>
													new Promise((r) => {
														const o = t.get(Zt),
															i = t.get(QM);
														zM(o, () => {
															r(!0);
														}),
															(t.get(Gc).afterPreactivation = () => (
																r(!0), i.closed ? O(void 0) : i
															)),
															o.initialNavigation();
													}),
											);
									},
								},
						  ]).ɵproviders
						: [],
				];
			}
			const KM = new b(""),
				K$ = [];
			let eH = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵmod = Yt({ type: e }));
						static #n = (this.ɵinj = Bt({ imports: [JM.forRoot(K$), JM] }));
					}
					return e;
				})(),
				tH = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵcmp = yn({
							type: e,
							selectors: [["app-logo-panel"]],
							decls: 1,
							vars: 0,
							consts: [["src", "./assets/logo.svg", "alt", "logo"]],
							template: function (r, o) {
								1 & r && Tt(0, "img", 0);
							},
							styles: [
								"[_nghost-%COMP%]{display:flex;justify-content:center;width:100%;margin:30px auto 13px}img[_ngcontent-%COMP%]{width:80px;height:100%}",
							],
							changeDetection: 0,
						}));
					}
					return e;
				})(),
				qc = (() => {
					class e {
						constructor() {
							(this.model = {
								allTransfers: !1,
								withoutStops: !0,
								oneStop: !1,
								twoStops: !1,
								threeStops: !1,
							}),
								(this.filtersStateListener$ = new Ot());
						}
						set allTransfers(n) {
							(this.model.allTransfers = n), this.filtersStateListener$.next(this.model);
						}
						get allTransfers() {
							return this.model.allTransfers;
						}
						set withoutStops(n) {
							(this.model.withoutStops = n), this.filtersStateListener$.next(this.model);
						}
						get withoutStops() {
							return this.model.withoutStops;
						}
						set oneStop(n) {
							(this.model.oneStop = n), this.filtersStateListener$.next(this.model);
						}
						get oneStop() {
							return this.model.oneStop;
						}
						set twoStops(n) {
							(this.model.twoStops = n), this.filtersStateListener$.next(this.model);
						}
						get twoStops() {
							return this.model.twoStops;
						}
						set threeStops(n) {
							(this.model.threeStops = n), this.filtersStateListener$.next(this.model);
						}
						get threeStops() {
							return this.model.threeStops;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac }));
					}
					return e;
				})(),
				Jp = (() => {
					class e {
						constructor(n, r) {
							(this._httpClient = n), (this._filterPanelService = r), (this.tickets$ = null);
						}
						getTickets() {
							return this._httpClient.get("./assets/json/tickets.json");
						}
						getCompanyById(n) {
							return this._httpClient
								.get("./assets/json/companies.json")
								.pipe(z((r) => r.find((o) => o.id === n)));
						}
						getCompanies() {
							return this._httpClient.get("./assets/json/companies.json");
						}
						getSegmentsByIds(n) {
							return this._httpClient
								.get("./assets/json/segments.json")
								.pipe(z((r) => r.filter((o) => n.includes(o.id))));
						}
						getSegments() {
							return this._httpClient.get("./assets/json/segments.json");
						}
						getFilteredTickets() {
							return (function bb(...e) {
								const t = Cb(e),
									{ args: n, keys: r } = _b(e),
									o = new Se((i) => {
										const { length: s } = n;
										if (!s) return void i.complete();
										const a = new Array(s);
										let u = s,
											c = s;
										for (let l = 0; l < s; l++) {
											let d = !1;
											cn(n[l]).subscribe(
												Re(
													i,
													(f) => {
														d || ((d = !0), c--), (a[l] = f);
													},
													() => u--,
													void 0,
													() => {
														(!u || !d) && (c || i.next(r ? Eb(r, a) : a), i.complete());
													},
												),
											);
										}
									});
								return t ? o.pipe(wb(t)) : o;
							})([this.getTickets(), this.getCompanies(), this.getSegments()]).pipe(
								z(([n, , r]) =>
									n.filter(
										(i) => (
											(i.segments = i.segments.filter((s) => {
												if (
													!Object.values(this._filterPanelService.model).includes(!0) ||
													this._filterPanelService.allTransfers
												)
													return !0;
												const u = r.find((l) => l.id === s);
												let c;
												switch (u?.stops.length) {
													case 0:
														c = this._filterPanelService.withoutStops;
														break;
													case 1:
														c = this._filterPanelService.oneStop;
														break;
													case 2:
														c = this._filterPanelService.twoStops;
														break;
													case 3:
														c = this._filterPanelService.threeStops;
														break;
													default:
														c = !0;
												}
												return c;
											})),
											i.segments.length > 0
										),
									),
								),
							);
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(S(RI), S(qc));
						});
						static #t = (this.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" }));
					}
					return e;
				})();
			const nH = ["*"];
			let rH = (() => {
				class e {
					constructor() {
						this.stateChange = new ge();
					}
					changeState(n) {
						(this.state = !this.state), this.stateChange.emit(this.state);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)();
					});
					static #t = (this.ɵcmp = yn({
						type: e,
						selectors: [["app-checkbox"]],
						inputs: { state: "state" },
						outputs: { stateChange: "stateChange" },
						ngContentSelectors: nH,
						decls: 4,
						vars: 1,
						consts: [
							[1, "container"],
							["type", "checkbox", 1, "checkbox", 3, "checked", "change"],
							[1, "checkmark"],
						],
						template: function (r, o) {
							1 & r &&
								((function oC(e) {
									const t = y()[De][qe];
									if (!t.projection) {
										const r = (t.projection = (function pa(e, t) {
												const n = [];
												for (let r = 0; r < e; r++) n.push(t);
												return n;
											})(e ? e.length : 1, null)),
											o = r.slice();
										let i = t.child;
										for (; null !== i; ) {
											const s = e ? tF(i, e) : 0;
											null !== s && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i)),
												(i = i.next);
										}
									}
								})(),
								q(0, "label", 0),
								(function iC(e, t = 0, n) {
									const r = y(),
										o = H(),
										i = yo(o, L + e, 16, null, n || null);
									null === i.projection && (i.projection = t),
										bl(),
										(!r[Lt] || Wr()) &&
											32 != (32 & i.flags) &&
											(function GA(e, t, n) {
												zv(t[k], 0, t, n, Vd(e, n, t), Vv(n.parent || t[qe], n, t));
											})(o, r, i);
								})(1),
								q(2, "input", 1),
								Be("change", function (s) {
									return o.changeState(s);
								}),
								Z(),
								Tt(3, "span", 2),
								Z()),
								2 & r && (ie(2), je("checked", o.state));
						},
						styles: [
							'.container[_ngcontent-%COMP%]{display:block;position:relative;padding-left:30px;height:40px;cursor:pointer;-webkit-user-select:none;user-select:none;font-size:.8rem;line-height:20px}.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.checkmark[_ngcontent-%COMP%]{position:absolute;top:0;left:0;height:18px;width:18px;border:1px solid var(--accent-color)}.container[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%] ~ .checkmark[_ngcontent-%COMP%]{margin:-1px;height:19px;width:19px}.checkmark[_ngcontent-%COMP%]:after{content:"";position:absolute;display:none}.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked ~ .checkmark[_ngcontent-%COMP%]:after{display:block}.container[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after{left:6px;top:2px;width:5px;height:10px;border:solid var(--accent-color);border-width:0 1px 1px 0;transform:rotate(45deg)}',
						],
					}));
				}
				return e;
			})();
			function oH(e, t) {
				if (1 & e) {
					const n = (function I_() {
						return y();
					})();
					jo(0),
						q(1, "app-checkbox", 1),
						Nr("stateChange", function (o) {
							Zr(n);
							const i = un();
							return zo(i.filterModel.allTransfers, o) || (i.filterModel.allTransfers = o), Qr(o);
						}),
						He(2, "\u0412\u0441\u0435"),
						Z(),
						q(3, "app-checkbox", 1),
						Nr("stateChange", function (o) {
							Zr(n);
							const i = un();
							return zo(i.filterModel.withoutStops, o) || (i.filterModel.withoutStops = o), Qr(o);
						}),
						He(4, "\u0411\u0435\u0437 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a"),
						Z(),
						q(5, "app-checkbox", 1),
						Nr("stateChange", function (o) {
							Zr(n);
							const i = un();
							return zo(i.filterModel.oneStop, o) || (i.filterModel.oneStop = o), Qr(o);
						}),
						He(6, "1 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430"),
						Z(),
						q(7, "app-checkbox", 1),
						Nr("stateChange", function (o) {
							Zr(n);
							const i = un();
							return zo(i.filterModel.twoStops, o) || (i.filterModel.twoStops = o), Qr(o);
						}),
						He(8, "2 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438"),
						Z(),
						q(9, "app-checkbox", 1),
						Nr("stateChange", function (o) {
							Zr(n);
							const i = un();
							return zo(i.filterModel.threeStops, o) || (i.filterModel.threeStops = o), Qr(o);
						}),
						He(10, "3 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438"),
						Z(),
						Bo();
				}
				if (2 & e) {
					const n = un();
					ie(),
						Ar("state", n.filterModel.allTransfers),
						ie(2),
						Ar("state", n.filterModel.withoutStops),
						ie(2),
						Ar("state", n.filterModel.oneStop),
						ie(2),
						Ar("state", n.filterModel.twoStops),
						ie(2),
						Ar("state", n.filterModel.threeStops);
				}
			}
			let iH = (() => {
				class e {
					constructor(n, r) {
						(this._ticketsService = n),
							(this._filterPanelService = r),
							(this.filterModel = null),
							(this.filterModel = this._filterPanelService);
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(Jp), C(qc));
					});
					static #t = (this.ɵcmp = yn({
						type: e,
						selectors: [["app-filter-panel"]],
						decls: 3,
						vars: 1,
						consts: [
							[4, "ngIf"],
							[3, "state", "stateChange"],
						],
						template: function (r, o) {
							1 & r &&
								(q(0, "p"),
								He(
									1,
									"\u041a\u041e\u041b\u0418\u0427\u0415\u0421\u0422\u0412\u041e \u041f\u0415\u0420\u0415\u0421\u0410\u0414\u041e\u041a",
								),
								Z(),
								ht(2, oH, 11, 5, "ng-container", 0)),
								2 & r && (ie(2), je("ngIf", o.filterModel));
						},
						dependencies: [lc, rH],
						styles: [
							"[_nghost-%COMP%]{display:block;box-sizing:border-box;padding:21px 23px 0;min-width:232px;border-radius:4px;background-color:#fff;box-shadow:0 2px 8px #0000001a}p[_ngcontent-%COMP%]{height:31px;color:var(--text-color);font-size:.75rem;font-weight:600;line-height:12px;letter-spacing:.5px;text-transform:uppercase}",
						],
						changeDetection: 0,
					}));
				}
				return e;
			})();
			var Kp = (function (e) {
					return (
						(e.left = "left-corner-rounded"),
						(e.right = "right-corner-rounded"),
						(e.both = "corner-rounded"),
						(e.none = ""),
						e
					);
				})(Kp || {}),
				eg = (function (e) {
					return (
						(e.big = "big-button"), (e.middle = "middle-button"), (e.small = "small-button"), e
					);
				})(eg || {});
			let sH = (() => {
					class e {
						constructor() {
							(this.textButton = ""),
								(this.sizeButtonClass = eg.small),
								(this.roundCornerClass = Kp.none),
								(this.clickOnButton = new ge());
						}
						getButtonClasses() {
							return [this.sizeButtonClass, this.roundCornerClass];
						}
						click(n) {
							this.clickOnButton.emit(n);
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵcmp = yn({
							type: e,
							selectors: [["app-button"]],
							inputs: {
								textButton: "textButton",
								sizeButtonClass: "sizeButtonClass",
								roundCornerClass: "roundCornerClass",
							},
							outputs: { clickOnButton: "clickOnButton" },
							decls: 2,
							vars: 2,
							consts: [[3, "ngClass", "click"]],
							template: function (r, o) {
								1 & r &&
									(q(0, "button", 0),
									Be("click", function (s) {
										return o.click(s);
									}),
									He(1),
									Z()),
									2 & r && (je("ngClass", o.getButtonClasses()), ie(), Lu(o.textButton));
							},
							dependencies: [_E],
							styles: [
								"button[_ngcontent-%COMP%]{height:50px;background:#fff;letter-spacing:.5px;text-transform:uppercase;color:var(--text-color);border:1px solid var(--border-color)}button[_ngcontent-%COMP%]:not(:disabled):hover{color:#fff;background:var(--accent-color);border-color:var(--accent-color);cursor:pointer}button[_ngcontent-%COMP%]:not(:disabled):active{border-color:#fff}.left-corner-rounded[_ngcontent-%COMP%]{border-top-left-radius:4px;border-bottom-left-radius:4px;margin-right:-1px}.right-corner-rounded[_ngcontent-%COMP%]{border-top-right-radius:4px;border-bottom-right-radius:4px;margin-left:-1px}.corner-rounded[_ngcontent-%COMP%]{border-radius:4px}.big-button[_ngcontent-%COMP%]{width:100%}.small-button[_ngcontent-%COMP%]{width:168px}",
							],
						}));
					}
					return e;
				})(),
				aH = (() => {
					class e {
						transform(n, r, o) {
							let i, s, a, u;
							return "ms" === r && "hhmmss" === o
								? ((s = Math.floor((n / 1e3) % 60)),
								  (a = Math.floor((n / 6e4) % 60)),
								  (u = Math.floor(n / 36e5)),
								  this.format(o, s, a, u, i))
								: "s" === r && "hhmmss" === o
								? ((s = Math.floor(n % 60)),
								  (a = Math.floor((n / 60) % 60)),
								  (u = Math.floor(n / 60 / 60)),
								  this.format(o, s, a, u, i))
								: "ms" !== r || ("ddhhmmss" !== o && "ddhhmmssLong" !== o)
								? "s" !== r || ("ddhhmmss" !== o && "ddhhmmssLong" !== o)
									? n
									: ((s = Math.floor(n % 60)),
									  (a = Math.floor((n / 60) % 60)),
									  (u = Math.floor((n / 60 / 60) % 24)),
									  (i = Math.floor(n / 60 / 60 / 24)),
									  this.format(o, s, a, u, i))
								: ((s = Math.floor((n / 1e3) % 60)),
								  (a = Math.floor((n / 6e4) % 60)),
								  (u = Math.floor((n / 36e5) % 24)),
								  (i = Math.floor(n / 864e5)),
								  this.format(o, s, a, u, i));
						}
						format(n, r, o, i, s) {
							switch (
								(+s < 10 && (s = "0" + s),
								+i < 10 && (i = "0" + i),
								+o < 10 && (o = "0" + o),
								+r < 10 && (r = "0" + r),
								n)
							) {
								case "hhmmss":
									return `${i}:${o}:${r}`;
								case "ddhhmmss":
									return +s > 0 ? `${s}\u0434 ${i}\u0447 ${o}\u043c` : `${i}\u0447 ${o}\u043c`;
								case "ddhhmmssLong":
									return `${s} days, ${i} hours, ${o} minutes, ${r} seconds`;
								default:
									return null;
							}
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵpipe = ze({ name: "durationFormat", type: e, pure: !1 }));
					}
					return e;
				})(),
				uH = (() => {
					class e {
						transform(n) {
							return 1 === n
								? "1 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430"
								: n > 1 && n < 5
								? `${n} \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0438`
								: `${n} \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a`;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵpipe = ze({ name: "inclinator", type: e, pure: !0 }));
					}
					return e;
				})();
			function cH(e, t) {
				if ((1 & e && (q(0, "div", 4), Tt(1, "img", 5), Z()), 2 & e)) {
					const n = t.ngIf;
					ie(), ku("src", "./assets/", n.logo, "", Sd);
				}
			}
			function lH(e, t) {
				if ((1 & e && (q(0, "div", 18), He(1), Xn(2, "inclinator"), Z()), 2 & e)) {
					const n = un().$implicit;
					ie(), Ho(" ", Bu(2, 1, n.stops.length), " ");
				}
			}
			function dH(e, t) {
				1 & e &&
					(q(0, "div", 18),
					He(1, " \u041d\u0435\u0442 \u043f\u0435\u0440\u0435\u0441\u0430\u0434\u043e\u043a "),
					Z());
			}
			function fH(e, t) {
				1 & e && (q(0, "i"), He(1, ", "), Z());
			}
			function hH(e, t) {
				if ((1 & e && (q(0, "span"), He(1), ht(2, fH, 2, 0, "i", 19), Z()), 2 & e)) {
					const n = t.$implicit,
						r = t.last;
					ie(), Lu(n), ie(), je("ngIf", !r);
				}
			}
			function pH(e, t) {
				if (
					(1 & e &&
						(q(0, "div", 6)(1, "div", 7)(2, "div", 8),
						He(3),
						Z(),
						q(4, "div", 9),
						He(5),
						Xn(6, "date"),
						Xn(7, "date"),
						Z()(),
						q(8, "div", 10)(9, "div", 11),
						He(10, " \u0412 \u043f\u0443\u0442\u0438 "),
						Z(),
						q(11, "div", 12),
						He(12),
						Xn(13, "durationFormat"),
						Z()(),
						q(14, "div", 13),
						ht(15, lH, 3, 3, "div", 14)(16, dH, 2, 0, "ng-template", null, 15, KC),
						q(18, "div", 16),
						ht(19, hH, 3, 2, "span", 17),
						Z()()()),
					2 & e)
				) {
					const n = t.$implicit,
						r = (function yC(e) {
							return qr(
								(function aS() {
									return x.lFrame.contextLView;
								})(),
								L + e,
							);
						})(17);
					ie(3),
						Vu(" ", n.origin, " - ", n.destination, " "),
						ie(2),
						Vu(" ", eh(6, 8, n.dateStart, "HH:mm"), " \u2013 ", eh(7, 11, n.dateEnd, "HH:mm"), " "),
						ie(7),
						Ho(
							" ",
							(function XC(e, t, n, r, o) {
								const i = e + L,
									s = y(),
									a = qr(s, i);
								return ys(s, i) ? ZC(s, nt(), t, a.transform, n, r, o, a) : a.transform(n, r, o);
							})(13, 14, n.duration, "ms", "ddhhmmss"),
							"",
						),
						ie(3),
						je("ngIf", n.stops.length > 0)("ngIfElse", r),
						ie(4),
						je("ngForOf", n.stops);
				}
			}
			function gH(e, t) {
				if (
					(1 & e &&
						(q(0, "div", 1),
						He(1),
						Xn(2, "currency"),
						Z(),
						ht(3, cH, 2, 1, "div", 2),
						Xn(4, "async"),
						ht(5, pH, 20, 18, "div", 3),
						Xn(6, "async")),
					2 & e)
				) {
					const n = un();
					ie(),
						Ho(
							" ",
							(function JC(e, t, n, r, o, i) {
								const s = e + L,
									a = y(),
									u = qr(a, s);
								return ys(a, s)
									? QC(a, nt(), t, u.transform, n, r, o, i, u)
									: u.transform(n, r, o, i);
							})(2, 3, n.model.price, "RUB", "symbol-narrow", "4.0"),
							" ",
						),
						ie(2),
						je("ngIf", Bu(4, 8, n.company$)),
						ie(2),
						je("ngForOf", Bu(6, 10, n.segments$));
				}
			}
			let mH = (() => {
				class e {
					constructor(n) {
						this._ticketsService = n;
					}
					ngOnInit() {
						this.getFullInformationOfTicket();
					}
					getFullInformationOfTicket() {
						(this.company$ = this._ticketsService.getCompanyById(this.model.companyId)),
							(this.segments$ = this._ticketsService.getSegmentsByIds(this.model.segments));
					}
					static #e = (this.ɵfac = function (r) {
						return new (r || e)(C(Jp));
					});
					static #t = (this.ɵcmp = yn({
						type: e,
						selectors: [["app-ticket"]],
						inputs: { model: "model" },
						decls: 1,
						vars: 1,
						consts: [
							[3, "ngIf"],
							[1, "price"],
							["class", "company-logo", 4, "ngIf"],
							["class", "flights", 4, "ngFor", "ngForOf"],
							[1, "company-logo"],
							["alt", "company logotype", 3, "src"],
							[1, "flights"],
							[1, "from-to"],
							[1, "from-to-dest"],
							[1, "from-to-time"],
							[1, "flight-time"],
							[1, "flight-time-caption"],
							[1, "flight-time-hours"],
							[1, "transfers"],
							["class", "transfers-number", 4, "ngIf", "ngIfElse"],
							["noStops", ""],
							[1, "transfers-cities"],
							[4, "ngFor", "ngForOf"],
							[1, "transfers-number"],
							[4, "ngIf"],
						],
						template: function (r, o) {
							1 & r && ht(0, gH, 7, 12, "ng-template", 0), 2 & r && je("ngIf", o.model);
						},
						dependencies: [xh, lc, IE, TE, ME, aH, uH],
						styles: [
							"[_nghost-%COMP%]{display:flex;box-sizing:border-box;flex-wrap:wrap;align-content:flex-start;width:502px;padding:20px;margin:10px 0;background-color:#fff;border-radius:4px;box-shadow:0 2px 8px #0000001a}.price[_ngcontent-%COMP%]{color:var(--accent-color);display:block;height:36px;width:50%;margin-bottom:16px;font-size:24px;font-weight:600;line-height:24px}.company-logo[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;width:50%;height:36px;margin-bottom:16px}.flights[_ngcontent-%COMP%]{display:flex;width:100%;margin-top:10px}.from-to[_ngcontent-%COMP%], .flight-time[_ngcontent-%COMP%], .transfers[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:141px;margin-right:10px}.from-to-dest[_ngcontent-%COMP%], .flight-time-caption[_ngcontent-%COMP%], .transfers-number[_ngcontent-%COMP%]{color:var(--secondary-text-color);font-size:.75rem;font-weight:600;line-height:18px;letter-spacing:.5px;text-transform:uppercase}.from-to-time[_ngcontent-%COMP%], .flight-time-hours[_ngcontent-%COMP%], .transfers-cities[_ngcontent-%COMP%]{color:var(--text-color);font-size:.875rem;font-weight:600;line-height:21px}",
						],
						changeDetection: 0,
					}));
				}
				return e;
			})();
			function vH(e, t) {
				if ((1 & e && (jo(0), Tt(1, "app-ticket", 5), Bo()), 2 & e)) {
					const n = t.$implicit;
					ie(), je("model", n);
				}
			}
			function yH(e, t) {
				if ((1 & e && (jo(0), ht(1, vH, 2, 1, "ng-container", 4), Bo()), 2 & e)) {
					const n = un();
					ie(), je("ngForOf", n.ticketsForModel)("ngForTrackBy", n.trackByIdAndIndex);
				}
			}
			let DH = (() => {
					class e {
						constructor(n, r, o) {
							(this._ticketsService = n),
								(this._filterPanelService = r),
								(this._cdr = o),
								(this.ticketsForModel = null),
								(this.countOfTicketsOnThePage = 5),
								(this.countOfTicketsToload = 5);
						}
						ngOnInit() {
							this._ticketsService.getFilteredTickets().subscribe({
								next: (n) => {
									(this.ticketsForModel = n.slice(0, this.countOfTicketsOnThePage)),
										this._cdr.markForCheck();
								},
							}),
								Ne(this._filterPanelService.filtersStateListener$).subscribe({
									next: () => {
										this._ticketsService.getFilteredTickets().subscribe({
											next: (n) => {
												(this.ticketsForModel = n.slice(0, this.countOfTicketsOnThePage)),
													this._cdr.markForCheck();
											},
										});
									},
								});
						}
						eRoundCorner() {
							return Kp;
						}
						eSizeButton() {
							return eg;
						}
						loadNewTickets() {
							(this.countOfTicketsOnThePage += this.countOfTicketsToload),
								this._ticketsService.getFilteredTickets().subscribe({
									next: (n) => {
										(this.ticketsForModel = n.slice(0, this.countOfTicketsOnThePage)),
											this._cdr.markForCheck();
									},
									error: (n) => new Error(n),
								});
						}
						sortForChipest() {
							this.ticketsForModel.sort((n, r) => n.price - r.price),
								(this.ticketsForModel = this.ticketsForModel.map((n, r) => {
									if (r + 1 === this.ticketsForModel.length) return n;
									for (
										let o = r;
										o < this.ticketsForModel.length - 1 &&
										n.companyId === this.ticketsForModel[o + 1].companyId &&
										n.price === this.ticketsForModel[o + 1].price &&
										n.segments.length &&
										this.ticketsForModel[o + 1].segments.length;
										o++
									)
										n.segments = [...n.segments, this.ticketsForModel[o + 1].segments.pop()];
									return n;
								})),
								(this.ticketsForModel = this.ticketsForModel.filter(
									(n) => 0 !== n.segments.length,
								)),
								this._cdr.markForCheck();
						}
						sortForFastest() {
							const n = this.ticketsForModel?.flatMap((r) => r.segments);
							n &&
								this._ticketsService.getSegmentsByIds(n).subscribe({
									next: (r) => {
										const o = r.sort((s, a) => s.duration - a.duration);
										let i = o.map((s) => {
											const u = { ...this.ticketsForModel.find((c) => c.segments.includes(s.id)) };
											return u.segments && (u.segments = u.segments.filter((c) => c === s.id)), u;
										});
										(i = i.map((s, a) => {
											if (a + 1 === i.length) return s;
											for (let u = a; u < i.length - 1; u++) {
												if (
													s.companyId !== i[u + 1].companyId ||
													s.price !== i[u + 1].price ||
													!i[u + 1].segments.length
												) {
													s.segments.sort((f, h) => {
														const p = o.find((m) => f === m.id),
															g = o.find((m) => h === m.id);
														return p && g ? Number(p.duration) - Number(g.duration) : 0;
													});
													break;
												}
												s.segments.push(i[u + 1].segments.pop());
											}
											return s;
										})),
											(this.ticketsForModel = i.filter((s) => 0 !== s.segments.length)),
											this._cdr.markForCheck();
									},
									error: (r) => new Error(r),
								});
						}
						sortForOptimal() {
							const n = this.ticketsForModel?.flatMap((r) => r.segments);
							n &&
								this._ticketsService.getSegmentsByIds(n).subscribe({
									next: (r) => {
										const o = r.map((i) => {
											const a = { ...this.ticketsForModel.find((u) => u.segments.includes(i.id)) };
											return a.segments && (a.segments = a.segments.filter((u) => u === i.id)), a;
										});
										o.sort((i, s) => {
											const a = o.map((h) => h.price).reduce((h, p) => h + p),
												u = i.price / a,
												c = s.price / a,
												l = r.map((h) => h.duration).reduce((h, p) => h + p);
											return (
												u +
												r.find((h) => h.id === i.segments[0]).duration / l -
												(c + r.find((h) => h.id === s.segments[0]).duration / l)
											);
										}),
											(this.ticketsForModel = o.filter((i) => 0 !== i.segments.length)),
											this._cdr.markForCheck();
									},
									error: (r) => new Error(r),
								});
						}
						trackByIdAndIndex(n, r) {
							return `${r.id} ${n} ${r.segments.length}`;
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)(C(Jp), C(qc), C(Co));
						});
						static #t = (this.ɵcmp = yn({
							type: e,
							selectors: [["app-tickets-panel"]],
							decls: 7,
							vars: 9,
							consts: [
								[3, "textButton", "roundCornerClass", "click"],
								[3, "textButton", "click"],
								[4, "ngIf"],
								[3, "textButton", "sizeButtonClass", "roundCornerClass", "click"],
								[4, "ngFor", "ngForOf", "ngForTrackBy"],
								[3, "model"],
							],
							template: function (r, o) {
								1 & r &&
									(q(0, "div")(1, "app-button", 0),
									Be("click", function () {
										return o.sortForChipest();
									}),
									Z(),
									q(2, "app-button", 1),
									Be("click", function () {
										return o.sortForFastest();
									}),
									Z(),
									q(3, "app-button", 0),
									Be("click", function () {
										return o.sortForOptimal();
									}),
									Z()(),
									q(4, "div"),
									ht(5, yH, 2, 2, "ng-container", 2),
									q(6, "app-button", 3),
									Be("click", function () {
										return o.loadNewTickets();
									}),
									Z()()),
									2 & r &&
										(ie(),
										je(
											"textButton",
											"\u0421\u0430\u043c\u044b\u0439 \u0434\u0435\u0448\u0435\u0432\u044b\u0439",
										)("roundCornerClass", o.eRoundCorner().left),
										ie(),
										je(
											"textButton",
											"\u0421\u0430\u043c\u044b\u0439 \u0431\u044b\u0441\u0442\u0440\u044b\u0439",
										),
										ie(),
										je(
											"textButton",
											"\u043e\u043f\u0442\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439",
										)("roundCornerClass", o.eRoundCorner().right),
										ie(2),
										je("ngIf", o.ticketsForModel),
										ie(),
										je(
											"textButton",
											"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0435\u0449\u0435",
										)("sizeButtonClass", o.eSizeButton().big)(
											"roundCornerClass",
											o.eRoundCorner().both,
										));
							},
							dependencies: [xh, lc, sH, mH],
							changeDetection: 0,
						}));
					}
					return e;
				})(),
				_H = (() => {
					class e {
						constructor() {
							this.title = "avia-angular";
						}
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵcmp = yn({
							type: e,
							selectors: [["app-root"]],
							decls: 11,
							vars: 0,
							consts: [
								[1, "refs"],
								[
									"href",
									"https://cainaican.github.io/portfolio/",
									"title",
									"back",
									1,
									"refs__back",
								],
								["src", "../assets/backPr.png", "alt", "portfolio", 1, "refs__back-img"],
								[
									"href",
									"https://github.com/cainaican/avia-angular",
									"title",
									"repo in github",
									1,
									"refs__back",
								],
								["src", "../assets/ghPr.png", "alt", "gitHub", 1, "refs__back-img"],
								[1, "logo-panel"],
								[1, "filter-panel"],
								[1, "tickets-panel"],
							],
							template: function (r, o) {
								1 & r &&
									(q(0, "div", 0)(1, "a", 1),
									Tt(2, "img", 2),
									Z(),
									q(3, "a", 3),
									Tt(4, "img", 4),
									Z()(),
									q(5, "div", 5),
									Tt(6, "app-logo-panel"),
									Z(),
									q(7, "div", 6),
									Tt(8, "app-filter-panel"),
									Z(),
									q(9, "div", 7),
									Tt(10, "app-tickets-panel"),
									Z());
							},
							dependencies: [tH, iH, DH],
							styles: [
								"[_nghost-%COMP%]{display:flex;flex-wrap:wrap;width:100vw;height:100vh;margin:20px auto;max-width:960px;align-content:flex-start}.logo-panel[_ngcontent-%COMP%]{display:block;width:100%}.filter-panel[_ngcontent-%COMP%]{display:block;max-width:30%;width:232px;margin:20px 10px 20px 100px}.tickets-panel[_ngcontent-%COMP%]{display:block;max-width:70%;margin:20px 100px 20px 10px}.refs[_ngcontent-%COMP%]{display:fixed;position:fixed;top:-3%;left:-2%;width:200px;text-decoration:none;margin:50px auto;text-align:center;align-items:center;justify-content:space-around}.refs__back-img[_ngcontent-%COMP%]{opacity:.5;width:35px;height:35px;margin-right:10px;border-radius:100%;transition:all .2s linear}.refs__back-img[_ngcontent-%COMP%]:hover{opacity:1;box-shadow:0 0 10px 15px #ffffff23}",
								'@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap");',
							],
							changeDetection: 0,
						}));
					}
					return e;
				})(),
				CH = (() => {
					class e {
						static #e = (this.ɵfac = function (r) {
							return new (r || e)();
						});
						static #t = (this.ɵmod = Yt({ type: e, bootstrap: [_H] }));
						static #n = (this.ɵinj = Bt({ providers: [qc], imports: [YV, eH, AE, Uj, mB] }));
					}
					return e;
				})();
			ZV()
				.bootstrapModule(CH)
				.catch((e) => console.error(e));
		},
	},
	(gi) => {
		gi((gi.s = 63));
	},
]);
