import { EventType } from "../common/enum.js";
import { GameEvent } from "../common/interface.js";
import { ClassEvent } from "../common/utility.js";

/** Lets all objects register and listen to events in a central location. */
export class EventHub {
    /** List of registered listener functions. */
    private static _listeners = new Map<string, ((eventArgs: GameEvent) => void)[]>();

    /**
     * Lets the hub listen to your event.
     * @param event The event, to which the hub should listen to.
     */
    static registerSender(event: ClassEvent) {
        event.register(this.eventRaised);
    }

    /**
     * Removes the hub from listening to you event.
     * @param event The event, from which the hub should unsubscribe from.
     */
    static unregisterSender(event: ClassEvent) {
        event.unregister(this.eventRaised)
    }

    /**
     * Registers a listener for specific event types.
     * @param callback The callback, that will react to the events.
     * @param types The types of events, to which the callback wants to listen to.
     */
    static registerListener(callback: (eventArgs: GameEvent) => void, ...types: EventType[]) {
        types.forEach(type => {
            if (!this._listeners.has(type.Name))
                this._listeners.set(type.Name, []);

            this._listeners.get(type.Name).push(callback);
        });
    }

    /**
     * Removes the listener function (and duplicates of the same instance) from the hub.
     * @param callback The callback to be removed from the hub.
     * @param types The types of events, from which to remove the callback.
     */
    static unregisterListener(callback: (eventArgs: GameEvent) => void, ...types: EventType[]) {
        types.forEach(type => {
            let group = this._listeners.get(type.Name);
            if (typeof group === "undefined")
                return;

            let index = group.indexOf(callback);
            while (index != -1) {
                group.splice(index, 1);
                index = group.indexOf(callback);
            }
        });
    }

    /**
     * Redirects the received event to listeners.
     * @param eventArgs The event arguments received with the raised event.
     */
    private static eventRaised(eventArgs: GameEvent){
        let group = this._listeners.get(eventArgs.EventType.Name);
        let expired: ((eventArgs: GameEvent) => void)[] = [];
        group.forEach(callback => {
            if (typeof callback === "function")
                callback(eventArgs);
            else
                expired.push(callback);
        });

        // Remove listeners that don't exist anymore
        expired.forEach(callback => group.splice(group.indexOf(callback), 1));
    }
}